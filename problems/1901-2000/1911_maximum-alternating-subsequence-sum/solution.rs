impl Solution {
    pub fn max_alternating_sum(nums: Vec<i32>) -> i64 {
        // Two running optima over subsequences of the prefix: `even` is the
        // best alternating sum whose last picked element sits at an even
        // reindexed position, `odd` the best with one extra odd-position
        // element, so each new element costs two O(1) transitions.
        let (mut even, mut odd) = (0i64, 0i64);
        for &x in &nums {
            let next_even = even.max(odd + x as i64);
            let next_odd = odd.max(even - x as i64);
            even = next_even;
            odd = next_odd;
        }
        even
    }
}
