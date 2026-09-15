impl Solution {
    // d[i] = nums1[i]-nums2[i]; count pairs with d[i]+d[j] > 0 by two
    // pointers over sorted d: d[l]+d[r] > 0 means all of l+1..r-1 also
    // pair with r, so add r-l and move r down.
    pub fn count_pairs(nums1: Vec<i32>, nums2: Vec<i32>) -> i64 {
        let mut d: Vec<i64> = nums1
            .iter()
            .zip(nums2.iter())
            .map(|(&a, &b)| a as i64 - b as i64)
            .collect();
        d.sort_unstable();
        let n = d.len();
        let mut total = 0i64;
        let (mut l, mut r) = (0usize, n - 1);
        while l < r {
            if d[l] + d[r] > 0 {
                total += (r - l) as i64;
                r -= 1;
            } else {
                l += 1;
            }
        }
        total
    }
}
