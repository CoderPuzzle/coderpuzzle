impl Solution {
    pub fn smallest_subarrays(nums: Vec<i32>) -> Vec<i32> {
        // One pass per bit, right to left: `last` is the nearest index at
        // or after i whose number carries that bit. The OR of nums[i..j]
        // is maximal exactly when j reaches the farthest such index over
        // all bits of the suffix OR, so answer[i] is the largest gap.
        let n = nums.len();
        let mut answer = vec![1i32; n];
        for bit in 0..30 {
            let mut last: i32 = -1;
            for i in (0..n).rev() {
                if (nums[i] >> bit) & 1 == 1 {
                    last = i as i32;
                }
                let gap = last - i as i32 + 1;
                if last != -1 && gap > answer[i] {
                    answer[i] = gap;
                }
            }
        }
        answer
    }
}
