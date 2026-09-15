// counts[d] is the number of distinct numbers of the current length that
// end on digit d. Every cell seeds one number of length 1, and each pass
// pushes every count through the knight's hop list — a number ending on d
// extends by one hop to each knight-neighbor of d — so n - 1 passes grow
// the row to length n and the row sum is the answer. Cell 5 has no
// knight-neighbor, so it seeds length 1 and never extends again.
function knightDialer(n: number): number {
    const MOD = 1_000_000_007;
    const hops: number[][] = [[4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9], [], [0, 1, 7], [2, 6], [1, 3], [2, 4]];
    let counts: number[] = new Array(10).fill(1);
    for (let step = 1; step < n; ++step) {
        const next: number[] = new Array(10).fill(0);
        for (let d = 0; d < 10; ++d) {
            for (const e of hops[d]) {
                next[e] = (next[e] + counts[d]) % MOD;
            }
        }
        counts = next;
    }
    let total = 0;
    for (const c of counts) {
        total = (total + c) % MOD;
    }
    return total;
}
