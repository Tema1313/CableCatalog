import { Colors } from "@/pages/catalogs/colors/Colors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/catalogs/colors")({
	component: Colors,
});
