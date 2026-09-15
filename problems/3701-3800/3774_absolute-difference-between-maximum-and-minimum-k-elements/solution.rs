impl Solution {
    pub fn abs_difference(mut nums: Vec<i32>, k: i32) -> i32 {
        // Sorted ascending, the k smallest elements occupy the first k
        // slots and the k largest the last k; all values are positive, so
        // the larger sum always comes from the top end and the absolute
        // difference is just last k minus first k.
        nums.sort_unstable();
        let k = k as usize;
        let small: i32 = nums[..k].iter().sum();
        let large: i32 = nums[nums.len() - k..].iter().sum();
        large - small
    }
}
