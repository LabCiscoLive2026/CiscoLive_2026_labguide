#!/usr/bin/env python

"""
This script will get all tenants (domains) in Stealthwatch using the REST API.

For more information on this API, please visit:
https://developer.cisco.com/docs/stealthwatch/

 -

Script Dependencies:
    requests
Depencency Installation:
    $ pip install requests

System Requirements:
    Stealthwatch Version: 6.10.0 or higher

Copyright (c) 2019, Cisco Systems, Inc. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

import requests
import json
import os
import sys
from dotenv import load_dotenv

try:
    requests.packages.urllib3.disable_warnings()
except Exception:
    pass

load_dotenv()

# Enter all authentication info
SMC_USER = os.getenv('SMC_USER')
SMC_PASSWORD = os.getenv('SMC_PASSWORD')
SMC_HOST = os.getenv('SMC_HOST')
# Token auth defaults to http (Cisco sample); set SMC_LOGIN_SCHEME=https if your SMC only serves TLS.
SMC_LOGIN_SCHEME = (os.getenv('SMC_LOGIN_SCHEME') or 'http').split(':')[0].lower()

# (connect seconds, read seconds) — avoids hanging forever on unreachable hosts
REQUEST_TIMEOUT = (15, 120)

if not SMC_HOST or not SMC_USER or not SMC_PASSWORD:
    print("Set SMC_HOST, SMC_USER, and SMC_PASSWORD in the environment or .env file.", file=sys.stderr)
    sys.exit(1)

# Stealthwatch Constants
XSRF_HEADER_NAME = 'X-XSRF-TOKEN'

# Set the URL for SMC login (e.g. http://10.0.13.50/token/v2/authenticate)
url = SMC_LOGIN_SCHEME + '://' + SMC_HOST + '/token/v2/authenticate'

# Let's create the login request data
login_request_data = {
    "username": SMC_USER,
    "password": SMC_PASSWORD
}

# Initialize the Requests session
api_session = requests.Session()

# Perform the POST request to login
try:
    response = api_session.request(
        "POST",
        url,
        verify=False,
        data=login_request_data,
        timeout=REQUEST_TIMEOUT,
    )
except requests.exceptions.ConnectTimeout:
    port = 443 if SMC_LOGIN_SCHEME == 'https' else 80
    print(
        "Connection timed out reaching {}://{} (default port {}). "
        "Use VPN/lab routing if required; check SMC_HOST; try SMC_LOGIN_SCHEME=https if auth is only on TLS. "
        "Ensure the port is allowed through any firewall.".format(
            SMC_LOGIN_SCHEME,
            SMC_HOST,
            port,
        ),
        file=sys.stderr,
    )
    sys.exit(1)
except requests.exceptions.ConnectionError as exc:
    print("Could not connect to {}: {}".format(SMC_HOST, exc), file=sys.stderr)
    sys.exit(1)

# If the login was successful
if response.status_code == 200:

    # Set XSRF token for future requests
    for cookie in response.cookies:
        if cookie.name == 'XSRF-TOKEN':
            api_session.headers.update({XSRF_HEADER_NAME: cookie.value})
            break

    # Get the list of tenants (domains) from the SMC
    url = 'https://' + SMC_HOST + '/sw-reporting/v1/tenants/'
    response = api_session.request("GET", url, verify=False, timeout=REQUEST_TIMEOUT)

    # If successfully able to get list of tenants (domains)
    if (response.status_code == 200):

        # Store the tenant (domain) ID as a variable to use later
        tenant_list = json.loads(response.content)["data"]
        SMC_TENANT_ID = tenant_list[0]["id"]

        # Print the SMC Tenant ID
        print("Tenant ID = {}".format(SMC_TENANT_ID))


    # If unable to fetch list of tenants (domains)
    else:
        print("An error has ocurred, while fetching tenants (domains), with the following code {}".format(response.status_code))

    uri = 'https://' + SMC_HOST + '/token'
    response = api_session.delete(uri, timeout=REQUEST_TIMEOUT, verify=False)
    api_session.headers.update({XSRF_HEADER_NAME: None})

# If the login was unsuccessful
else:
    print(
        "An error has ocurred, while logging in, with the following code {}".format(response.status_code),
        file=sys.stderr,
    )

