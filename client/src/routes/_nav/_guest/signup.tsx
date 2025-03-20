import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_nav/_guest/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_nav/_guest/signup"!</div>
}
