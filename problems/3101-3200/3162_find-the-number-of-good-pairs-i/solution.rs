impl Solution {
    pub fn number_of_pairs(nums1: Vec<i32>, nums2: Vec<i32>, k: i32) -> i32 {
        // The constraints are tiny (50 x 50), so the direct double loop
        // wins: for every value in nums2 build the divisor nums2[j] * k and
        // count how many values of nums1 it divides.
        let mut total = 0;
        for &value in &nums1 {
            for &base in &nums2 {
                let divisor = base * k;
                if value % divisor == 0 {
                    total += 1;
                }
            }
        }
        total
    }
}
