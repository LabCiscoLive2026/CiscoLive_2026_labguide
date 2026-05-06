# Lab User Credentials

Use the credentials below to log in to the **lab environment**. Each participant should use their **assigned user account**.

!!! info "Credential Reservation"
    Click **Reserve** next to any available account to claim it for your 90-minute lab session. The account will automatically become available again when the timer expires.

<div style="margin-top: 16px;">
  <iframe
    id="credsFrame"
    src="/static/creds_reservation_pdu.html"
    width="100%"
    height="900"
    scrolling="no"
    style="border: none; border-radius: 8px; display: block; overflow: hidden;"
    title="Reserve your Lab Credential">
  </iframe>
</div>

<script>
  window.addEventListener('message', function(e) {
    if (e.data && e.data.iframeHeight) {
      var f = document.getElementById('credsFrame');
      if (f) f.height = e.data.iframeHeight + 8;
    }
  });
</script>

---
