impl Solution {
    pub fn max_uncrossed_lines(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        let n = nums2.len();
        let mut prev = vec![0i32; n + 1];
        for &a in &nums1 {
            let mut cur = vec![0i32; n + 1];
            for j in 1..=n {
                if a == nums2[j - 1] {
                    cur[j] = prev[j - 1] + 1;
                } else {
                    cur[j] = cur[j - 1].max(prev[j]);
                }
            }
            prev = cur;
        }
        prev[n]
    }
}
