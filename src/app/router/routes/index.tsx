import { CatsPageLayout } from "@/pages/cats"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: CatsPageLayout,
})
