function tripletCount(a: number[], b: number[], c: number[]): number {
    // XOR never creates or destroys parity: every bit position of the
    // result holds the mod-2 sum of the operands' bits there, so a triplet's
    // XOR has an even number of set bits exactly when an even number of its
    // operands — zero or two — carries an odd popcount.
    const arrays = [a, b, c];
    const evens = [0, 0, 0];
    const odds = [0, 0, 0];
    for (let i = 0; i < 3; ++i) {
        for (const x of arrays[i]) {
            let bits = 0;
            for (let v = x; v > 0; v >>= 1) {
                bits += v & 1;
            }
            if (bits % 2 === 0) {
                ++evens[i];
            } else {
                ++odds[i];
            }
        }
    }
    return (
        evens[0] * evens[1] * evens[2] +
        odds[0] * odds[1] * evens[2] +
        odds[0] * evens[1] * odds[2] +
        evens[0] * odds[1] * odds[2]
    );
}
