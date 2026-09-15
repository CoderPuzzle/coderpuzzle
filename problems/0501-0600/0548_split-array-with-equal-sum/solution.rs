use std::collections::HashSet;

impl Solution {
    pub fn split_array(nums: Vec<i32>) -> bool {
        // Fix the middle cut j: the four parts share one sum exactly when
        // some left split (0 < i < j - 1) balances — sum(0, i - 1) ==
        // sum(i + 1, j - 1) — and some right split (j + 1 < k < n - 1)
        // balances on the SAME value — sum(j + 1, k - 1) == sum(k + 1, n - 1).
        // Prefix sums turn every part into a difference of two table
        // entries: collect the balanced left values of this j in a set,
        // then scan k for a balanced right value already in the set.
        let n = nums.len();
        let mut prefix = vec![0i64; n + 1];
        for index in 0..n {
            prefix[index + 1] = prefix[index] + nums[index] as i64;
        }
        for j in 3..n.saturating_sub(3) {
            let mut seen: HashSet<i64> = HashSet::new();
            for i in 1..j - 1 {
                if prefix[i] == prefix[j] - prefix[i + 1] {
                    seen.insert(prefix[i]);
                }
            }
            for k in j + 2..n - 1 {
                if prefix[k] - prefix[j + 1] == prefix[n] - prefix[k + 1] && seen.contains(&(prefix[k] - prefix[j + 1]))
                {
                    return true;
                }
            }
        }
        false
    }
}
