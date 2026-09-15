impl Solution {
    pub fn sum_of_unique(nums: Vec<i32>) -> i32 {
        // An element counts only if it appears exactly once. Values are
        // bounded to 1..100, so a fixed frequency table settles every
        // element in one pass; a second sweep sums the singletons.
        let mut count = [0i32; 101];
        for &v in &nums {
            count[v as usize] += 1;
        }
        nums.iter().filter(|&&v| count[v as usize] == 1).sum()
    }
}
