impl Solution {
    pub fn is_array_special(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<bool> {
        let n = nums.len();
        let mut reach = vec![0i32; n];
        for i in 1..n {
            reach[i] = if nums[i - 1] % 2 == nums[i] % 2 {
                i as i32
            } else {
                reach[i - 1]
            };
        }
        queries.iter().map(|q| reach[q[1] as usize] <= q[0]).collect()
    }
}
