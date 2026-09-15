impl Solution {
    // Every value is positive, so the difference is maximized by the product
    // of the two largest values minus the product of the two smallest; one
    // streaming pass maintains all four extremes. The extreme product
    // 1e4 * 1e4 = 1e8 fits comfortably in an i32.
    pub fn max_product_difference(nums: Vec<i32>) -> i32 {
        let (mut m1, mut m2) = (0, 0);
        let (mut s1, mut s2) = (1_000_000_000, 1_000_000_000);
        for &x in &nums {
            if x > m1 {
                m2 = m1;
                m1 = x;
            } else if x > m2 {
                m2 = x;
            }
            if x < s1 {
                s2 = s1;
                s1 = x;
            } else if x < s2 {
                s2 = x;
            }
        }
        m1 * m2 - s1 * s2
    }
}
