import type { ICable } from "@/shared/api/model";
import { create } from "zustand";

interface IUseCableProductsStore {
    cableProducts: ICable[];
    setCableProducts: (cableProducts: ICable[]) => void;
    cableProductId: number | null;
    setCableProductId: (cableProductId: number | null) => void;
    // currentNodeIdOfTree: string | null;
    // setCurrentNodeIdOfTree: (nodeId: string | null) => void;
    // currentVersionTreeId: string | null;
    // setCurrentVersionTreeId: (currentVersionTreeId: string | null) => void;
}

export const useCableProductsStore = create<IUseCableProductsStore>((set) => ({
    cableProducts: [],
    setCableProducts: (cableProducts) => set({ cableProducts }),
    cableProductId: null,
    setCableProductId: (cableProductId) => set({ cableProductId }),
    // currentNodeIdOfTree: null,
    // setCurrentNodeIdOfTree: (currentNodeIdOfTree) => set({ currentNodeIdOfTree }),
    // currentVersionTreeId: null,
    // setCurrentVersionTreeId: (currentVersionTreeId) => set({ currentVersionTreeId }),
}));
