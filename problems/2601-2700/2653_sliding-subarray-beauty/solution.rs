impl Solution {
    // Values are bounded to [-50, 50], so only the 50 negative values can
    // ever be an answer: cnt[(v + 50) as usize] counts copies of the
    // negative value v inside the current window. Each answer is found by
    // walking those buckets smallest value first until x negatives
    // accumulate (0 when fewer than x).
    pub fn get_subarray_beauty(nums: Vec<i32>, k: i32, x: i32) -> Vec<i32> {
        let n = nums.len();
        let mut cnt = vec![0_i32; 50];
        let mut res = vec![0_i32; n - k as usize + 1];
        for i in 0..n {
            if nums[i] < 0 {
                cnt[(nums[i] + 50) as usize] += 1;
            }
            let j = i as i32 - k;
            if j >= 0 && nums[j as usize] < 0 {
                cnt[(nums[j as usize] + 50) as usize] -= 1;
            }
            if (i as i32) >= k - 1 {
                // Walk the buckets smallest value first until x negatives
                // have been seen; fewer than x in total means beauty 0.
                let mut rem = x;
                let mut beauty = 0;
                for d in 0..50 {
                    if rem <= 0 {
                        break;
                    }
                    rem -= cnt[d];
                    if rem <= 0 {
                        beauty = d as i32 - 50;
                    }
                }
                res[i - k as usize + 1] = beauty;
            }
        }
        res
    }
}
