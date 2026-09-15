impl Solution {
    pub fn split_array(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        // e ends the longest strictly increasing prefix: a left part
        // nums[0..i] is strictly increasing exactly when i <= e.
        let mut e = 0usize;
        while e + 1 < n && nums[e + 1] > nums[e] {
            e += 1;
        }
        // s starts the longest strictly decreasing suffix: a right part
        // nums[i+1..n-1] is strictly decreasing exactly when i + 1 >= s.
        let mut s = n - 1;
        while s > 0 && nums[s - 1] > nums[s] {
            s -= 1;
        }
        // One scan accumulates the left sum; the right sum is the total
        // minus it. Only indices inside the anchor window are scored.
        // Sums reach 10^10, so every accumulator stays in 64 bits.
        let total: i64 = nums.iter().map(|&x| x as i64).sum();
        let mut best: i64 = -1;
        let mut left: i64 = 0;
        for i in 0..n - 1 {
            left += nums[i] as i64;
            if i + 1 >= s && i <= e {
                let mut diff = left - (total - left);
                if diff < 0 {
                    diff = -diff;
                }
                if best == -1 || diff < best {
                    best = diff;
                }
            }
        }
        best
    }
}
