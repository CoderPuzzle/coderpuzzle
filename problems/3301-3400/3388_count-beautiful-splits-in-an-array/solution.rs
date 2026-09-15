impl Solution {
    pub fn beautiful_splits(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        if n < 3 {
            return 0;
        }
        let w = n + 1;
        // lcp[i][j] = longest common prefix of nums[i:] and nums[j:]
        let mut lcp = vec![0u16; w * w];
        for i in (0..n).rev() {
            let row = i * w;
            let next_row = (i + 1) * w;
            let ni = nums[i];
            for j in ((i + 1)..n).rev() {
                if ni == nums[j] {
                    lcp[row + j] = lcp[next_row + j + 1] + 1;
                }
            }
        }

        let mut count: i32 = 0;
        for i in 1..n - 1 {
            // i = end of nums1, start of nums2
            let mut j_end = n;
            // Case A: nums1 is a prefix of nums2 => j >= 2*i and nums[0:i] == nums[i:2i]
            if lcp[i] as usize >= i && 2 * i <= n - 1 {
                count += (n - 2 * i) as i32;
                j_end = 2 * i;
            }
            // Case B: nums2 is a prefix of nums3, counting only j not already covered by A
            let row = i * w;
            for j in (i + 1)..j_end {
                let len = j - i;
                if lcp[row + j] as usize >= len && n - j >= len {
                    count += 1;
                }
            }
        }
        count
    }
}
