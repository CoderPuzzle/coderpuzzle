impl Solution {
    pub fn knight_dialer(n: i32) -> i32 {
        // counts[d] is the number of distinct numbers of the current length
        // that end on digit d. Every cell seeds one number of length 1, and
        // each pass pushes every count through the knight's hop list — a
        // number ending on d extends by one hop to each knight-neighbor of
        // d — so n - 1 passes grow the row to length n and the row sum is
        // the answer. Cell 5 has no knight-neighbor, so it seeds length 1
        // and never extends again.
        const MOD: i64 = 1_000_000_007;
        const HOPS: [&[usize]; 10] = [
            &[4, 6],
            &[6, 8],
            &[7, 9],
            &[4, 8],
            &[0, 3, 9],
            &[],
            &[0, 1, 7],
            &[2, 6],
            &[1, 3],
            &[2, 4],
        ];
        let mut counts = [1i64; 10];
        for _ in 1..n as usize {
            let mut next = [0i64; 10];
            for (d, row) in HOPS.iter().enumerate() {
                for &e in *row {
                    next[e] = (next[e] + counts[d]) % MOD;
                }
            }
            counts = next;
        }
        (counts.iter().sum::<i64>() % MOD) as i32
    }
}
