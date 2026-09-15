// Densest packing lives in a corner. A complete k-step staircase floor of
// T(k) = k(k+1)/2 cells carries the pyramid of S(k) = k(k+1)(k+2)/6 boxes,
// and j extra cells laid along the next diagonal add T(j) = j(j+1)/2 more.
// Binary-search the largest pyramid strictly below n, then the fewest
// runoff cells covering the rest; the answer is T(k) + j.
impl Solution {
    pub fn minimum_boxes(n: i32) -> i32 {
        let target = i64::from(n);
        let (mut lo, mut hi) = (0i64, 2500i64); // S(2500) > 2^31 - 1, so hi stands above every n
        while hi - lo > 1 {
            let mid = (lo + hi) / 2;
            if mid * (mid + 1) * (mid + 2) / 6 < target {
                lo = mid;
            } else {
                hi = mid;
            }
        }
        let k = lo; // largest k with S(k) < n
        let rest = target - k * (k + 1) * (k + 2) / 6;
        let (mut jlo, mut jhi) = (1i64, k + 1); // T(k+1) >= rest always holds
        while jlo < jhi {
            let mid = (jlo + jhi) / 2;
            if mid * (mid + 1) / 2 >= rest {
                jhi = mid;
            } else {
                jlo = mid + 1;
            }
        }
        (k * (k + 1) / 2 + jlo) as i32
    }
}
