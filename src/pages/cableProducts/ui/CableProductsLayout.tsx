import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/ui/resizable"
import type { FC } from "react"
import { Filters } from "./Filters"
import { CableProducts } from "./CableProducts"

interface ICableProductsProps {
	currentCableProductId?: number
}

export const CableProductsLayout: FC<ICableProductsProps> = (props) => {
	return (
		<ResizablePanelGroup direction="horizontal" className="overflow-auto">
			<ResizablePanel defaultSize={10} maxSize={50}>
				<Filters />
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={90} className="relative flex flex-col">
				<CableProducts currentCableProductId={props.currentCableProductId} />
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
