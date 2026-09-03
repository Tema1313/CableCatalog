import { Materials } from "@/pages/catalogs/materials/Materials";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/catalogs/materials")({
	component: Materials,
});
