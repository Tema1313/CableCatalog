import { CableProductsLayout } from "@/pages/cableProducts"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: CableProductsLayout,
})
