function getMaxFunctionValue(receiver: number[], k: number): number {
    const n = receiver.length;
    const log = k.toString(2).length; // bit length of k
    const up: number[][] = Array.from({ length: log }, () => new Array(n).fill(0));
    const sm: number[][] = Array.from({ length: log }, () => new Array(n).fill(0));
    for (let x = 0; x < n; x++) {
        up[0][x] = receiver[x];
        sm[0][x] = receiver[x];
    }
    // Binary lifting: up[j][x] is the holder after 2^j passes from x,
    // sm[j][x] the sum of receivers during them. Each level composes two
    // half-jumps; the sum adds sm at x plus sm at the midpoint because the
    // second jump's receivers start where the first lands.
    for (let j = 1; j < log; j++) {
        for (let x = 0; x < n; x++) {
            const mid = up[j - 1][x];
            up[j][x] = up[j - 1][mid];
            sm[j][x] = sm[j - 1][x] + sm[j - 1][mid];
        }
    }
    let best = 0;
    for (let x = 0; x < n; x++) {
        // x itself counts in the score but appears in no receiving sum.
        // Decompose k into set bits: each set bit b contributes sm[b][cur]
        // and teleports cur, simulating k <= 1e10 passes in log k steps.
        let total = x;
        let cur = x;
        let remaining = k;
        let bit = 0;
        while (remaining > 0) {
            if (remaining % 2 === 1) {
                total += sm[bit][cur];
                cur = up[bit][cur];
            }
            remaining = Math.floor(remaining / 2);
            bit += 1;
        }
        if (total > best) {
            best = total;
        }
    }
    return best;
}
