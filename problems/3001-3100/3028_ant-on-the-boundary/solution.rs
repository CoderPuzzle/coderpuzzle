impl Solution {
    pub fn return_to_boundary_count(nums: Vec<i32>) -> i32 {
        let mut position: i32 = 0;
        let mut returns: i32 = 0;
        for num in nums {
            position += num;
            if position == 0 {
                returns += 1;
            }
        }
        returns
    }
}
