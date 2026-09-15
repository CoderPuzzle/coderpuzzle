function getStrongest(arr: number[], k: number): number[] {
    const sortedArr = [...arr].sort((a, b) => a - b);
    const m = sortedArr[(arr.length - 1) >> 1];
    return [...arr]
        .sort((a, b) => {
            const da = Math.abs(a - m);
            const db = Math.abs(b - m);
            if (da !== db) {
                return db - da;
            }
            return b - a;
        })
        .slice(0, k);
}
