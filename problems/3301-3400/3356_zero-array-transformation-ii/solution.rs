impl Solution {
    // After the first k queries an index can reach zero exactly when the
    // total val of the queries covering it is at least nums[i] — each
    // index can spend every covering query's allowance independently, and
    // extra queries never hurt, so feasibility is monotone in k. Binary
    // search k; each probe folds the first k queries into a difference
    // array and checks one prefix sweep, O(n + q). Coverage sums are
    // bounded by q * val <= 5 * 10^5, well inside i32.
    pub fn min_zero_array(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> i32 {
        let feasible = |k: usize| -> bool {
            let n = nums.len();
            let mut delta = vec![0i32; n + 1];
            for query in queries.iter().take(k) {
                delta[query[0] as usize] += query[2];
                delta[query[1] as usize + 1] -= query[2];
            }
            let mut cover = 0i32;
            for i in 0..n {
                cover += delta[i];
                if cover < nums[i] {
                    return false;
                }
            }
            true
        };
        let (mut lo, mut hi) = (0usize, queries.len());
        if !feasible(hi) {
            return -1;
        }
        while lo < hi {
            let mid = (lo + hi) / 2;
            if feasible(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
