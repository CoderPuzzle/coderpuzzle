impl Solution {
    pub fn count_ways(nums: Vec<i32>) -> i32 {
        // A size-k group exists exactly when k values lie strictly below k
        // and none equals k, so each candidate size is two comparisons on
        // the sorted copy. Values satisfy 0 <= nums[i] < n and the answer
        // is at most n + 1 <= 100001, far inside i32 range.
        let mut values = nums.clone();
        values.sort();
        let n = values.len();
        let mut ways = 0;
        for k in 0..=n {
            let below_ok = k == 0 || values[k - 1] < k as i32;
            let above_ok = k == n || values[k] > k as i32;
            if below_ok && above_ok {
                ways += 1;
            }
        }
        ways
    }
}
