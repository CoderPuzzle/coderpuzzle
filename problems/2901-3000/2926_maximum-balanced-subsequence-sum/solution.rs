impl Solution {
    pub fn max_balanced_subsequence_sum(nums: Vec<i32>) -> i64 {
        // Balance rearranges to nums[j] - j >= nums[i] - i, so a subsequence
        // is balanced precisely when b[i] = nums[i] - i is non-decreasing
        // along it. Compress b into ranks to key the Fenwick tree.
        let n = nums.len();
        let vals: Vec<i64> = (0..n).map(|i| nums[i] as i64 - i as i64).collect();
        let mut comp = vals.clone();
        comp.sort_unstable();
        comp.dedup();
        let m = comp.len();

        // Max-flavored Fenwick tree (update propagates dp values upward,
        // query takes the best dp among ranks <= i), initialized to zero —
        // which implements the max(0, ...) cutoff: a single element is
        // always a balanced subsequence, so negative predecessors are
        // ignored and each element may start fresh.
        let mut bit = vec![0i64; m + 1];
        let mut ans: i64 = i64::MIN;

        for i in 0..n {
            // dp[i] = nums[i] + best predecessor dp with rank <= j. Ties are
            // fine since equal b values satisfy the rearranged inequality,
            // so the query includes i's own rank.
            let j = comp.partition_point(|&v| v < vals[i]) + 1;
            let best = Self::query(&bit, j);
            let dp = if best <= 0 {
                nums[i] as i64
            } else {
                nums[i] as i64 + best
            };
            if dp > ans {
                ans = dp;
            }
            Self::update(&mut bit, j, dp);
        }
        ans
    }

    fn update(bit: &mut Vec<i64>, mut i: usize, value: i64) {
        let m = bit.len() - 1;
        while i <= m {
            if value > bit[i] {
                bit[i] = value;
            }
            i += i & i.wrapping_neg();
        }
    }

    fn query(bit: &Vec<i64>, mut i: usize) -> i64 {
        let mut best: i64 = 0;
        while i > 0 {
            if bit[i] > best {
                best = bit[i];
            }
            i -= i & i.wrapping_neg();
        }
        best
    }
}
