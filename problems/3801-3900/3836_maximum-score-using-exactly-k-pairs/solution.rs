impl Solution {
    // Bounds: n, m <= 100 and |values| <= 10^6, so each product is at most
    // 10^12 and the k <= 100-term total at most 10^14 — everything lives
    // comfortably in an i64.
    pub fn max_score(nums1: Vec<i32>, nums2: Vec<i32>, k: i32) -> i64 {
        let n = nums1.len();
        let m = nums2.len();
        let k = k as usize;
        // dp layer t over prefix lengths (a, b): the best score of exactly
        // t pairs inside nums1[..a] x nums2[..b]. Layer 0 is identically 0,
        // and layer t only has feasible cells at a >= t, b >= t (fewer than
        // t elements cannot host t pairs); every prev[a-1][b-1] read at
        // such a cell lies inside layer t-1's feasible rectangle, so no
        // sentinel is ever needed.
        let mut prev = vec![vec![0i64; m + 1]; n + 1];
        let mut cur = vec![vec![0i64; m + 1]; n + 1];
        for t in 1..=k {
            for a in t..=n {
                let x = nums1[a - 1] as i64;
                for b in t..=m {
                    let mut best = prev[a - 1][b - 1] + x * nums2[b - 1] as i64;
                    if a > t && cur[a - 1][b] > best {
                        best = cur[a - 1][b];
                    }
                    if b > t && cur[a][b - 1] > best {
                        best = cur[a][b - 1];
                    }
                    cur[a][b] = best;
                }
            }
            std::mem::swap(&mut prev, &mut cur);
        }
        prev[n][m]
    }
}
