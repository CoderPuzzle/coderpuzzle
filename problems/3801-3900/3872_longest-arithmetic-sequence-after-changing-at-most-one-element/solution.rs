impl Solution {
    // Every value is bounded by n <= 10^5, so i32 arithmetic carries
    // everything. left/right: longest run of equal consecutive differences
    // ending at i / starting at i (a pair always counts as a run of 2).
    pub fn longest_arithmetic(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut left = vec![1i32; n];
        let mut right = vec![1i32; n];
        for i in 1..n {
            if i >= 2 && nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2] {
                left[i] = left[i - 1] + 1;
            } else {
                left[i] = 2;
            }
        }
        for i in (0..n.saturating_sub(1)).rev() {
            if i + 2 < n && nums[i + 1] - nums[i] == nums[i + 2] - nums[i + 1] {
                right[i] = right[i + 1] + 1;
            } else {
                right[i] = 2;
            }
        }
        let mut best = *left.iter().max().unwrap();
        // Replacing nums[p] either stops the subarray at p (extending the
        // run on one side) or spans p, gluing a left run to a right run
        // whose common difference is forced to (nums[p+1]-nums[p-1])/2.
        for p in 0..n {
            if p >= 1 {
                best = best.max(left[p - 1] + 1);
            }
            if p + 1 < n {
                best = best.max(right[p + 1] + 1);
            }
            if p >= 1 && p + 1 < n {
                let diff = nums[p + 1] - nums[p - 1];
                if diff % 2 == 0 {
                    let d = diff / 2;
                    let left_len = if p >= 2 && nums[p - 1] - nums[p - 2] == d {
                        left[p - 1]
                    } else {
                        1
                    };
                    let right_len = if p + 2 < n && nums[p + 2] - nums[p + 1] == d {
                        right[p + 1]
                    } else {
                        1
                    };
                    best = best.max(left_len + right_len + 1);
                }
            }
        }
        best
    }
}
