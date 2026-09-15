impl Solution {
    pub fn longest_subarray(nums: Vec<i32>) -> i32 {
        // AND never exceeds any member, so the maximum subarray AND is
        // max(nums), and only subarrays made entirely of that value attain
        // it: adding anything smaller strictly lowers the AND. The answer
        // is therefore the longest run of consecutive occurrences of the
        // maximum.
        let target = *nums.iter().max().unwrap();
        let mut best = 0;
        let mut run = 0;
        for &num in &nums {
            if num == target {
                run += 1;
                best = best.max(run);
            } else {
                run = 0;
            }
        }
        best
    }
}
