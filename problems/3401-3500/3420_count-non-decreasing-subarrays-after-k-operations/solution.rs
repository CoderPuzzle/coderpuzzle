impl Solution {
    pub fn count_non_decreasing_subarrays(nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        let mut result: i64 = 0;
        let mut cnt: i64 = 0;
        let mut dq: Vec<usize> = vec![0; n];
        let mut tail = 0usize; // back of deque (next push position)
        let mut head = 0usize; // front of deque
        let mut right: i64 = n as i64 - 1;
        for left in (0..n).rev() {
            // Merge stack segments: raise smaller elements to nums[left].
            while head < tail && (nums[dq[tail - 1]] as i64) < nums[left] as i64 {
                tail -= 1;
                let l = dq[tail];
                let r: i64 = if head < tail { dq[tail - 1] as i64 - 1 } else { right };
                cnt += (r - l as i64 + 1) * (nums[left] as i64 - nums[l] as i64);
            }
            dq[tail] = left;
            tail += 1;
            // Shrink the window from the right if the cost exceeds k.
            while cnt > k as i64 {
                cnt -= nums[dq[head]] as i64 - nums[right as usize] as i64;
                if dq[head] as i64 == right {
                    head += 1;
                }
                right -= 1;
            }
            result += right - left as i64 + 1;
        }
        result
    }
}
