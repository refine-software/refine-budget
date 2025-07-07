import { useCallback, useRef } from "react";


export function useLongPress(callback: () => void, delay = 500) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const start = useCallback(() => {
        timerRef.current = setTimeout(() => {
            callback();
        }, delay);
    }, [callback, delay]);

    const clear = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    return {
        onMouseDown: start,
        onMouseUp: clear,
        onMouseLeave: clear,
        onTouchStart: start,
        onTouchEnd: clear,
    };
}