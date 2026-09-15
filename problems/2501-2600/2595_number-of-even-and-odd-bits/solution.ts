function evenOddBit(n: number): number[] {
    // Peel the binary representation one bit at a time from the right;
    // the peel counter doubles as the bit index, whose parity routes each
    // set bit into the even or the odd bucket.
    const counts = [0, 0];
    let pos = 0;
    while (n > 0) {
        if (n & 1) {
            counts[pos % 2]++;
        }
        n = Math.floor(n / 2);
        pos++;
    }
    return counts;
}
