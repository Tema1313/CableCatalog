import { CableProductsLayout } from "@/pages/cableProducts"
import { createFileRoute, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/cableProduct/$cableProductId")({
	component: Component,
	notFoundComponent: () => <div>404 Not Found</div>,
})

export default function Component() {
	const cableProductId = useParams({
		from: "/cableProduct/$cableProductId",
		select: ({ cableProductId }) => Number(cableProductId),
	})
	return <CableProductsLayout currentCableProductId={cableProductId} />
}
