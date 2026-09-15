impl Solution {
    pub fn max_subarrays(nums: Vec<i32>) -> i32 {
        let mut completed = 0;
        let mut current = -1;
        for num in nums {
            current &= num;
            if current == 0 {
                completed += 1;
                current = -1;
            }
        }
        completed.max(1)
    }
}
