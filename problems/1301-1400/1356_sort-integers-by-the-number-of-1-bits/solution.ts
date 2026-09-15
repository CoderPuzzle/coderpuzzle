function sortByBits(arr: number[]): number[] {
    // The order is the lexicographic order of (popcount, value).
    const popcount = (x: number): number => {
        let count = 0;
        while (x) {
            count += x & 1;
            x >>>= 1;
        }
        return count;
    };
    return arr.sort((a, b) => {
        const pa = popcount(a);
        const pb = popcount(b);
        return pa !== pb ? pa - pb : a - b;
    });
}
