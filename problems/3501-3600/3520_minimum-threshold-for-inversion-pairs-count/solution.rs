impl Solution {
    // count(x) = #{(i, j) : i < j, nums[i] > nums[j], nums[i] - nums[j] <=
    // x} is non-decreasing in x, so binary search the smallest x with
    // count(x) >= k. Each count sweeps left to right with a Fenwick tree
    // over the compressed values, adding for every j the number of earlier
    // elements whose value falls in the window (nums[j], nums[j] + x].
    // n <= 1e4 bounds the pair count by n*(n-1)/2 < 5e7, well inside i32.
    pub fn min_threshold(nums: Vec<i32>, k: i32) -> i32 {
        let mut vals = nums.clone();
        vals.sort_unstable();
        vals.dedup();
        let m = vals.len();
        let max_diff = (vals[m - 1] - vals[0]) as i64;

        let count = |x: i64| -> i64 {
            let mut tree = vec![0i32; m + 1];
            let mut total: i64 = 0;
            for &v in &nums {
                // Earlier elements with value in (v, v + x]; the window
                // bound is computed in i64 because v + x can pass 2^31.
                let c = vals.partition_point(|&t| t < v);
                let hi = vals.partition_point(|&t| (t as i64) <= v as i64 + x);
                let mut i = hi;
                while i > 0 {
                    total += tree[i] as i64;
                    i -= i & i.wrapping_neg();
                }
                // c is the 0-based compressed index; its Fenwick position
                // is c + 1, so the prefix cut and the insert start there.
                let mut i = c + 1;
                while i > 0 {
                    total -= tree[i] as i64;
                    i -= i & i.wrapping_neg();
                }
                let mut i = c + 1;
                while i <= m {
                    tree[i] += 1;
                    i += i & i.wrapping_neg();
                }
            }
            total
        };

        if max_diff == 0 || count(max_diff) < k as i64 {
            return -1;
        }
        let (mut lo, mut hi) = (1i64, max_diff);
        while lo < hi {
            let mid = (lo + hi) / 2;
            if count(mid) >= k as i64 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
