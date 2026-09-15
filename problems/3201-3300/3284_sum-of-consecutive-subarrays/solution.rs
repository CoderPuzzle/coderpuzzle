impl Solution {
    pub fn get_sum(nums: Vec<i32>) -> i32 {
        // Scan maximal constant-step (+1 / -1) runs left to right, carrying
        // ending, the sum of all consecutive subarrays that end at the
        // current index. Repeating the direction grows the run and extends
        // every such subarray (ending += chain * x after the increment); a
        // unit step in a new direction keeps only the fresh pair plus [x];
        // any other step keeps only [x]. Reduced mod 10^9 + 7 each step,
        // so the widest intermediate is chain * x <= 10^10, within i64.
        const MOD: i64 = 1_000_000_007;
        let mut total = nums[0] as i64;
        let mut chain: usize = 1;
        let mut ending = nums[0] as i64;
        let mut direction = 0_i32;
        for i in 1..nums.len() {
            let d = nums[i] - nums[i - 1];
            if d == direction && d != 0 {
                chain += 1;
                ending = (ending + chain as i64 * nums[i] as i64) % MOD;
            } else if d == 1 || d == -1 {
                direction = d;
                chain = 2;
                ending = (nums[i - 1] as i64 + 2 * nums[i] as i64) % MOD;
            } else {
                direction = 0;
                chain = 1;
                ending = nums[i] as i64;
            }
            total = (total + ending) % MOD;
        }
        total as i32
    }
}
