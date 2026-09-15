function getLeastFrequentDigit(n: number): number {
    // Count each digit into its bucket by peeling digits off; Math.floor
    // stands in for integer division on the way down.
    const counts: number[] = new Array(10).fill(0);
    while (n > 0) {
        counts[n % 10]++;
        n = Math.floor(n / 10);
    }
    // Ascending scan with a strict comparison keeps the smallest digit on
    // ties; empty buckets never qualify.
    let best = -1;
    for (let digit = 0; digit < 10; digit++) {
        if (counts[digit] > 0 && (best === -1 || counts[digit] < counts[best])) {
            best = digit;
        }
    }
    return best;
}
