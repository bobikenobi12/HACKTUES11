import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_nav/_guest/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_nav/_guest/login"!</div>
}
