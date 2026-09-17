import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cars/brands")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/cars/brands"!</div>;
}
