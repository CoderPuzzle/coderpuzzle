impl Solution {
    pub fn count_elements(nums: Vec<i32>, k: i32) -> i32 {
        // Sorting lines every element up with its rank: the elements
        // strictly greater than a value are exactly the sorted suffix
        // after that value's run. The whole count hangs on one threshold,
        // the value at sorted index t = n - k - 1.
        let mut ordered = nums;
        ordered.sort_unstable();
        let n = ordered.len();
        let threshold = ordered[n - 1 - k as usize];
        // Elements strictly below the threshold all qualify: their runs
        // end before it. The run AT the threshold qualifies only when its
        // last member still sees >= k strictly greater values, i.e. the
        // run ends at or before t. Values above the threshold never do.
        let left = ordered.partition_point(|&v| v < threshold);
        let right = ordered.partition_point(|&v| v <= threshold);
        if (n - right) as i32 >= k {
            return right as i32;
        }
        left as i32
    }
}
