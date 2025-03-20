import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_nav/_auth/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_nav/_auth/dashboard"!</div>
}
