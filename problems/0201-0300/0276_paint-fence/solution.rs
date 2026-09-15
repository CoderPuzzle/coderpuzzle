impl Solution {
    pub fn num_ways(n: i32, k: i32) -> i32 {
        // Rolling counts for the prefix built so far: same = its last two
        // posts share a color, diff = they differ. Seeded at the first post:
        // nothing precedes it to match, so all k colors start as "differs".
        // The constraints bound the answer below 2^31 - 1; i64 rolling keeps
        // every intermediate product comfortably inside range.
        let mut same: i64 = 0;
        let mut diff: i64 = k as i64;
        for _ in 1..n {
            // A same-color post must follow a differing pair, and a differing
            // post picks any of the k - 1 remaining colors after anything.
            let next_same = diff;
            diff = (same + diff) * (k as i64 - 1);
            same = next_same;
        }
        (same + diff) as i32
    }
}
