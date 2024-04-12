import { useState, useEffect } from 'react'

export const useDebounce = (value: number, milliSeconds: number) => {
    const [debouncedValue, setDebouncedValue] = useState(0);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, milliSeconds);

        return () => {
            clearTimeout(handler);
        };
    }, [value, milliSeconds]);

    return debouncedValue;
};