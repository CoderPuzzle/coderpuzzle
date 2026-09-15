impl Solution {
    pub fn minimum_cost(nums: Vec<i32>) -> i32 {
        let mut smallest = nums[1];
        let mut second = nums[2];
        if nums[2] < smallest {
            smallest = nums[2];
            second = nums[1];
        }
        for index in 3..nums.len() {
            let value = nums[index];
            if value < smallest {
                second = smallest;
                smallest = value;
            } else if value < second {
                second = value;
            }
        }
        nums[0] + smallest + second
    }
}
