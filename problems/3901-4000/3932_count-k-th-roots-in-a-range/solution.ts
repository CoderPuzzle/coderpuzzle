function countKthRoots(l: number, r: number, k: number): number {
    if (k === 1) return r - l + 1;
    const count = (bound: number): number => {
        if (bound < 0) return 0;
        const fits = (base: number): boolean => {
            let value = 1;
            for (let i = 0; i < k; i++) {
                if (base !== 0 && value > Math.floor(bound / base)) return false;
                value *= base;
            }
            return value <= bound;
        };
        let low = 0;
        let high = bound;
        while (low < high) {
            const middle = Math.floor((low + high + 1) / 2);
            if (fits(middle)) low = middle;
            else high = middle - 1;
        }
        return low + 1;
    };
    return count(r) - count(l - 1);
}
