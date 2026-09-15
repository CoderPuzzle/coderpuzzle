impl Solution {
    pub fn longest_subarray(nums: Vec<i32>) -> i32 {
        // One sweep carrying a run counter: any adjacent pair is a valid
        // Fibonacci array, so runs start at length 2; each later element
        // extends the run when it equals the sum of the two before it and
        // snaps the counter back to 2 when it does not. The sum is taken
        // in i64: two elements reach 2e9, at the edge of i32 range.
        let mut best = 2;
        let mut current = 2;
        for i in 2..nums.len() {
            let sum = nums[i - 1] as i64 + nums[i - 2] as i64;
            if sum == nums[i] as i64 {
                current += 1;
            } else {
                current = 2;
            }
            if current > best {
                best = current;
            }
        }
        best
    }
}
