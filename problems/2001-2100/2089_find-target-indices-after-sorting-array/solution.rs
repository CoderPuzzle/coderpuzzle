impl Solution {
    pub fn target_indices(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let smaller = nums.iter().filter(|&&value| value < target).count() as i32;
        let equal = nums.iter().filter(|&&value| value == target).count() as i32;
        (smaller..smaller + equal).collect()
    }
}
