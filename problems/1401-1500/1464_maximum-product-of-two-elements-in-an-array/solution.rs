impl Solution {
    pub fn max_product(nums: Vec<i32>) -> i32 {
        let mut first = 0;
        let mut second = 0;
        for &value in &nums {
            if value > first {
                second = first;
                first = value;
            } else if value > second {
                second = value;
            }
        }
        (first - 1) * (second - 1)
    }
}
