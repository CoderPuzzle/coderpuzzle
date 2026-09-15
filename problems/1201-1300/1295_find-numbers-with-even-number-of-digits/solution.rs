impl Solution {
    pub fn find_numbers(nums: Vec<i32>) -> i32 {
        // Each division by 10 sheds one digit; the step count is the digit
        // count. Even tallies are what we count.
        let mut even = 0;
        for mut value in nums {
            let mut digits = 0;
            while value > 0 {
                value /= 10;
                digits += 1;
            }
            if digits % 2 == 0 {
                even += 1;
            }
        }
        even
    }
}
