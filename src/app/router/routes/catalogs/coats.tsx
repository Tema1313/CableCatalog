import { Coats } from "@/pages/catalogs/coats"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/catalogs/coats")({
	component: Coats,
})
