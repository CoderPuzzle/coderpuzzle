impl Solution {
    pub fn get_sneaky_numbers(nums: Vec<i32>) -> Vec<i32> {
        // Values all lie in 0..n-1, so a counter array indexed by value finds
        // the two count-2 entries; the ascending walk emits them in order.
        let n = nums.len() - 2;
        let mut count = vec![0i32; n];
        for &x in &nums {
            count[x as usize] += 1;
        }
        (0..n).filter(|&v| count[v] == 2).map(|v| v as i32).collect()
    }
}
