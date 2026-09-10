import { Breeds } from "@/pages/catalogs/breeds"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/catalogs/breeds")({
	component: Breeds,
})
