impl Solution {
    // Rearrangement inequality: ascending x descending pairing minimizes
    // the sum of products over all rearrangements of nums1.
    pub fn min_product_sum(nums1: Vec<i32>, mut nums2: Vec<i32>) -> i64 {
        let mut a = nums1;
        a.sort_unstable();
        nums2.sort_unstable_by(|x, y| y.cmp(x));
        a.iter().zip(nums2.iter()).map(|(&x, &y)| x as i64 * y as i64).sum()
    }
}
