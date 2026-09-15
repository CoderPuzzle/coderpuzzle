impl Solution {
    pub fn find_number_of_lis(nums: Vec<i32>) -> i32 {
        // lengths[i] / counts[i]: the longest strictly increasing subsequence
        // ending at i, and how many of that length end there. A longer
        // predecessor (nums[j] < nums[i]) resets the count to counts[j], an
        // equally long one adds to it, so each i finishes with the total over
        // its best arrivals. Only the returned answer is promised to fit 32
        // bits - counts below the maximum can stand far higher - so the
        // counts accumulate in i64.
        let n = nums.len();
        let mut lengths = vec![1usize; n];
        let mut counts = vec![1i64; n];
        let mut best = 0usize;
        let mut answer = 0i64;
        for i in 0..n {
            for j in 0..i {
                if nums[j] < nums[i] {
                    let candidate = lengths[j] + 1;
                    if candidate > lengths[i] {
                        lengths[i] = candidate;
                        counts[i] = counts[j];
                    } else if candidate == lengths[i] {
                        counts[i] += counts[j];
                    }
                }
            }
            if lengths[i] > best {
                best = lengths[i];
                answer = counts[i];
            } else if lengths[i] == best {
                answer += counts[i];
            }
        }
        answer as i32
    }
}
