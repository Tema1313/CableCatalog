import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/ui/resizable"
import type { FC } from "react"
import { Cats } from "./Cats"
import { Filters } from "./Filters"

interface ICableProductsProps {
	catId?: number
}

export const CatsPageLayout: FC<ICableProductsProps> = (props) => {
	return (
		<ResizablePanelGroup direction="horizontal" className="overflow-auto">
			<ResizablePanel defaultSize={10} maxSize={50}>
				<Filters />
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={90} className="relative flex flex-col">
				<Cats catId={props.catId} />
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
