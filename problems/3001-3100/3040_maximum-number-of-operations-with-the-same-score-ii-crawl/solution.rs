impl Solution {
    pub fn max_operations(nums: Vec<i32>) -> i32 {
        // The first operation fixes the score, and its pair is one of three:
        // the two head elements, the two tail elements, or both end elements.
        let n = nums.len();
        let head_pair = nums[0] + nums[1];
        let end_pair = nums[0] + nums[n - 1];
        let tail_pair = nums[n - 2] + nums[n - 1];
        let mut best = 0;
        for target in [head_pair, end_pair, tail_pair] {
            // Every operation deletes exactly two elements, so a window keeps
            // its width parity; roll one dp layer per reachable width.
            let mut previous = vec![0_i32; n + 2];
            let mut width = 2 + n % 2;
            while width <= n {
                let mut current = vec![0_i32; n + 2];
                for left in 0..(n - width + 1) {
                    let right = left + width - 1;
                    let mut value = 0;
                    if nums[left] + nums[right] == target {
                        value = value.max(1 + previous[left + 1]);
                    }
                    if nums[left] + nums[left + 1] == target {
                        value = value.max(1 + previous[left + 2]);
                    }
                    if nums[right - 1] + nums[right] == target {
                        value = value.max(1 + previous[left]);
                    }
                    current[left] = value;
                }
                previous = current;
                width += 2;
            }
            best = best.max(previous[0]);
        }
        best
    }
}
