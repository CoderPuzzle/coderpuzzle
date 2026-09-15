function numberOfStableArrays(zero: number, one: number, limit: number): number {
    // Bottom-up block DP: dp[z][o][d] counts stable arrays ending with
    // digit d; appending a block of the opposite digit sums the trailing
    // `limit` cells along one axis. Residues stay under 2^31 and window
    // totals under 1000 * MOD < 2^50, exact as JS Numbers.
    const MOD = 1000000007;
    const w = one + 1;
    const vert = new Array<number>(w).fill(0);
    let prevOnes = new Array<number>(w).fill(0);
    const history: number[][] = [];
    let answer = 0;
    for (let z = 0; z <= zero; z++) {
        for (let o = 0; o < w; o++) {
            vert[o] += prevOnes[o];
        }
        const drop = z - 1 - limit;
        if (drop >= 0) {
            const gone = history[drop];
            for (let o = 0; o < w; o++) {
                vert[o] -= gone[o];
            }
        }
        const curZeros = new Array<number>(w).fill(0);
        curZeros[0] = z >= 1 && z <= limit ? 1 : 0;
        const curOnes = new Array<number>(w).fill(0);
        // Circular ring buffer over this row's zero cells, seeded with the
        // column-0 base cell so windows reach down to index 0.
        const ring = new Array<number>(limit).fill(0);
        let head = 1 % limit,
            tail = 0,
            count = 1,
            ringSum = curZeros[0];
        ring[0] = curZeros[0];
        for (let o = 1; o <= one; o++) {
            curZeros[o] = vert[o] % MOD;
            curOnes[o] = ringSum % MOD;
            if (count === limit) {
                ringSum -= ring[tail];
                if (++tail === limit) tail = 0;
                count--;
            }
            ring[head] = curZeros[o];
            if (++head === limit) head = 0;
            count++;
            ringSum += curZeros[o];
        }
        if (z === 0) {
            // Row z === 0 holds the all-ones prefixes themselves.
            for (let o = 1; o <= one; o++) {
                curOnes[o] = o <= limit ? 1 : 0;
            }
        }
        answer = (curZeros[one] + curOnes[one]) % MOD;
        if (z < zero) history[z] = curOnes;
        prevOnes = curOnes;
    }
    return answer;
}
