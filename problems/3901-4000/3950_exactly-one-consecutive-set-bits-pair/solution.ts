function consecutiveSetBits(n: number): boolean {
    let pairs = 0;
    let previous = 0;
    while (n > 0) {
        const current = n & 1;
        if (current && previous) {
            pairs++;
            if (pairs > 1) return false;
        }
        previous = current;
        n = Math.floor(n / 2);
    }
    return pairs === 1;
}
