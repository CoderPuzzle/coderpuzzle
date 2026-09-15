impl Solution {
    pub fn minimum_array_length(nums: Vec<i32>) -> i32 {
        // A unique minimum absorbs everything (m % y == m for y > m), and a
        // value not divisible by the minimum forges an even smaller unique
        // minimum — both end at length 1. Otherwise every survivor stays a
        // multiple of m, and only merging two copies of m removes one.
        let m = *nums.iter().min().unwrap();
        let count = nums.iter().filter(|&&value| value == m).count();
        let indivisible = nums.iter().any(|&value| value % m != 0);
        if count == 1 || indivisible {
            return 1;
        }
        ((count + 1) / 2) as i32
    }
}
