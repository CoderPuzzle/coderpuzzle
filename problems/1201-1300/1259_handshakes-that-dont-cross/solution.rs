impl Solution {
    pub fn number_of_ways(num_people: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let m = (num_people / 2) as usize;
        // catalan[i] = non-crossing handshake layouts for i pairs; an empty
        // circle has exactly one layout, anchoring the recurrence.
        let mut catalan = vec![0i64; m + 1];
        catalan[0] = 1;
        for i in 1..=m {
            let mut total: i64 = 0;
            // Fix person 1 and sum over their partner: the chord splits the
            // circle into two arcs filled independently (anything crossing
            // between arcs would cross the pivot chord). Partner j leaves
            // j pairs on one side and i-1-j on the other — the Catalan
            // recurrence catalan[i] = Σ catalan[j]·catalan[i-1-j].
            for j in 0..i {
                total = (total + catalan[j] * catalan[i - 1 - j]) % MOD;
            }
            catalan[i] = total;
        }
        catalan[m] as i32
    }
}
