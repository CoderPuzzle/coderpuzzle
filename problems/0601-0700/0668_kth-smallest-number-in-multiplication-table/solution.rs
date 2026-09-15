impl Solution {
    pub fn find_kth_number(m: i32, n: i32, k: i32) -> i32 {
        let m = m as i64;
        let n = n as i64;
        let k = k as i64;
        // The table is too big to build; its values are orderly enough to count.
        // Row i holds multiples i, 2i, ..., ni — min(x / i, n) of them are <= x.
        let count_at_most = |x: i64| -> bool {
            let mut total: i64 = 0;
            for i in 1..=m {
                total += (x / i).min(n);
                // Early exit once the count already reaches k.
                if total >= k {
                    return true;
                }
            }
            total >= k
        };
        // Smallest x whose count reaches k; it must be an actual table entry,
        // otherwise x - 1 would satisfy the predicate too.
        let mut lo: i64 = 1;
        let mut hi: i64 = m * n;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if count_at_most(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
