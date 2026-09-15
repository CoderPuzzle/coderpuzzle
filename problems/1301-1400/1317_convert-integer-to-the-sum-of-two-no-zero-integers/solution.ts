function getNoZeroIntegers(n: number): number[] {
    // Smallest-a decomposition: arithmetic digit test, no strings.
    const noZero = (x: number): boolean => {
        while (x > 0) {
            if (x % 10 === 0) return false;
            x = Math.floor(x / 10);
        }
        return true;
    };
    for (let a = 1; a < n; ++a) {
        if (noZero(a) && noZero(n - a)) return [a, n - a];
    }
    return [];
}
