import { useSearch } from "@tanstack/react-router";
import { useCableProductsStore } from "../model/cableProductsStore";
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation";
import { getCableProducts } from "@/shared/api/GET/getCableProducts";

export const useUpdateCableProducts = () => {
    const { setCableProducts } = useCableProductsStore((store) => store);
    const searchParams = useSearch({ from: "__root__" });
    const [loading, reqSim] = useRequestSimulation()

    const updateCableProductList = () => {
        return reqSim(() => {
            const result = getCableProducts({
                cableType: searchParams.cableTypeId ? Number(searchParams.cableTypeId) : undefined,
                colorId: searchParams.colorId ? Number(searchParams.colorId) : undefined,
                materialId: searchParams.materialId ? Number(searchParams.materialId) : undefined,
                name: searchParams.name ? searchParams.name : undefined,
                shortName: searchParams.shortName ? searchParams.shortName : undefined
            })

            return getCableProducts({
                cableType: searchParams.cableTypeId ? Number(searchParams.cableTypeId) : undefined,
                colorId: searchParams.colorId ? Number(searchParams.colorId) : undefined,
                materialId: searchParams.materialId ? Number(searchParams.materialId) : undefined,
                name: searchParams.name ? searchParams.name : undefined,
                shortName: searchParams.shortName ? searchParams.shortName : undefined
            })
        }, 1500).then((response) => {
            setCableProducts(response);
        });
    };

    return { updateCableProductList, isLoading: loading };
};
