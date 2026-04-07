import { useParams } from 'react-router-dom'
import PlaceholderPage from './PlaceholderPage'

const titles = {
  'alarm-severity': 'Alarm Severity',
  'policy-management': 'Policy Management',
  'response-management': 'Response Management',
  'network-scanners': 'Network Scanners',
  analytics: 'Analytics',
  alerts: 'Alerts',
  'pack-management': 'Pack Management',
  'central-management': 'Central Management',
  'user-management': 'User Management',
  manager: 'Manager',
  'udp-director': 'UDP Director',
  'external-lookup': 'External Lookup',
  services: 'Services',
  applications: 'Applications',
  'domain-properties': 'Domain Properties',
  'flow-collectors': 'Flow Collectors',
  exporters: 'Exporters',
}

export default function ConfigurePlaceholderPage() {
  const { section } = useParams()
  const title = titles[section] ?? section ?? 'Configure'
  return <PlaceholderPage title={title} />
}
