impl Solution {
    pub fn maximize_sweetness(sweetness: Vec<i32>, k: i32) -> i32 {
        let total: i64 = sweetness.iter().map(|&v| v as i64).sum();

        // Greedy check: cut as soon as the running sum reaches the target.
        // Cutting earlier never hurts — a delay only feeds an already-satisfied
        // piece and leaves less material for the remaining ones.
        let pieces_at_least = |target: i64| -> i64 {
            let mut count: i64 = 0;
            let mut current: i64 = 0;
            for &value in sweetness.iter() {
                current += value as i64;
                if current >= target {
                    count += 1;
                    current = 0;
                }
            }
            count
        };

        // Binary search on the answer t: "can we get k+1 pieces each of
        // sweetness >= t?" is monotone in t. The average piece caps the range
        // above; every chunk is positive so t = 1 is always feasible.
        let mut lo: i64 = 1;
        let mut hi: i64 = total / (k as i64 + 1);
        let mut best: i64 = 0;
        while lo <= hi {
            let mid = (lo + hi) / 2;
            if pieces_at_least(mid) >= k as i64 + 1 {
                // At least k+1 pieces: merging surplus neighbours only raises
                // their sums, so t is feasible — record it and aim higher.
                best = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        best as i32
    }
}
