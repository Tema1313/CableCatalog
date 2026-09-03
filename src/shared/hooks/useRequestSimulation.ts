import { useState, useCallback } from "react";

export const useRequestSimulation = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const requestSimulation = useCallback(
        async <T,>(func: () => T | Promise<T>, delay: number = 1000): Promise<T> => {
            setLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, delay));
                const result = await func();
                return result;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return [loading, requestSimulation] as const;
};