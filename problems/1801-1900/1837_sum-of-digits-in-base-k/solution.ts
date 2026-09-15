function sumBase(n: number, k: number): number {
    // Repeated division by k peels off one base-k digit at a time; the
    // digits arrive least-significant first but summing is order-free.
    let total = 0;
    let value = n;
    while (value > 0) {
        total += value % k;
        value = Math.floor(value / k);
    }
    return total;
}
