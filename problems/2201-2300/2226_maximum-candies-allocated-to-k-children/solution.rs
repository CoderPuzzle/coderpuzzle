impl Solution {
    pub fn maximum_candies(candies: Vec<i32>, k: i64) -> i32 {
        // feasibility is monotone in c: if every child can get c, any smaller
        // amount works too, so binary search the largest feasible pile size
        let can = |c: i64| -> bool {
            if c == 0 {
                return true;
            }
            let mut cnt: i64 = 0;
            for &p in &candies {
                // a pile of size p splits into exactly p / c child portions
                cnt += (p as i64) / c;
                if cnt >= k {
                    return true;
                }
            }
            cnt >= k
        };

        let mut lo: i64 = 0;
        let mut hi: i64 = candies.iter().copied().max().unwrap() as i64;
        while lo < hi {
            // upper mid: feasible moves lo up to mid; the +1 avoids stalling
            let mid = lo + (hi - lo + 1) / 2;
            if can(mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo as i32
    }
}
