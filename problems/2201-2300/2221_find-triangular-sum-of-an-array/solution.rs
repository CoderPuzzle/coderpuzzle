impl Solution {
    pub fn triangular_sum(nums: Vec<i32>) -> i32 {
        let mut current = nums;
        while current.len() > 1 {
            let next: Vec<i32> = (0..current.len() - 1)
                .map(|i| (current[i] + current[i + 1]) % 10)
                .collect();
            current = next;
        }
        current[0]
    }
}
