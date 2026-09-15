impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        // One operation on the whole array replaces every element with
        // their common bitwise AND, so any array equalizes in at most one
        // step; zero steps suffice only when it already is constant.
        if nums.iter().all(|&x| x == nums[0]) {
            0
        } else {
            1
        }
    }
}
