function mirrorDistance(n: number): number {
    // Peel digits least-significant first to build the reversal; any
    // trailing zeros of n simply never materialize as leading zeros.
    // Both sides stay below 10^9, far below 2^53, so numbers stay exact.
    const original: number = n;
    let reversed: number = 0;
    while (n > 0) {
        reversed = reversed * 10 + (n % 10);
        n = Math.floor(n / 10);
    }
    return Math.abs(original - reversed);
}
