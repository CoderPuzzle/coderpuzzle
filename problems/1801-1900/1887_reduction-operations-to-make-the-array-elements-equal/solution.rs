impl Solution {
    // Sorted ascending: crossing into a new (larger) distinct value
    // raises the level; element i costs its level = number of distinct
    // smaller values below it.
    pub fn reduction_operations(mut nums: Vec<i32>) -> i64 {
        nums.sort_unstable();
        let mut ans = 0i64;
        let mut level = 0i64;
        for i in 1..nums.len() {
            if nums[i] != nums[i - 1] {
                level += 1;
            }
            ans += level;
        }
        ans
    }
}
