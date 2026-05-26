import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cover-essay')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/cover-essay"!</div>
}
