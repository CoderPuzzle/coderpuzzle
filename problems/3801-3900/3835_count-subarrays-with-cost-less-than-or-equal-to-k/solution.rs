impl Solution {
    // Bounds: (max-min) <= 10^9-1 and length <= 10^5, so every cost is
    // < 10^14; the answer is at most n(n+1)/2 ~ 5*10^9 — both live
    // comfortably in an i64.
    pub fn count_subarrays(nums: Vec<i32>, k: i64) -> i64 {
        let n = nums.len();
        let mut max_q: Vec<usize> = Vec::with_capacity(n); // max candidates, values decreasing
        let mut min_q: Vec<usize> = Vec::with_capacity(n); // min candidates, values increasing
        let mut max_head = 0usize;
        let mut min_head = 0usize;
        let mut ans = 0i64;
        let mut left = 0usize;
        for right in 0..n {
            let x = nums[right];
            while max_q.len() > max_head && nums[max_q[max_q.len() - 1]] <= x {
                max_q.pop();
            }
            max_q.push(right);
            while min_q.len() > min_head && nums[min_q[min_q.len() - 1]] >= x {
                min_q.pop();
            }
            min_q.push(right);
            // Growing the window only raises max, lowers min and lengthens
            // the window, so cost is non-decreasing in window size: shrink
            // from the left while invalid, then every subarray ending at
            // right with left endpoint >= left is valid — right-left+1 of
            // them. A single element costs 0 <= k, so the loop stops.
            loop {
                let spread = nums[max_q[max_head]] as i64 - nums[min_q[min_head]] as i64;
                let span = (right - left + 1) as i64;
                if spread * span <= k {
                    break;
                }
                if max_q[max_head] == left {
                    max_head += 1;
                }
                if min_q[min_head] == left {
                    min_head += 1;
                }
                left += 1;
            }
            ans += (right - left + 1) as i64;
        }
        ans
    }
}
