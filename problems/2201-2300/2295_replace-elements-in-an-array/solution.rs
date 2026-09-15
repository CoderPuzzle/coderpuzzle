impl Solution {
    pub fn array_change(nums: Vec<i32>, operations: Vec<Vec<i32>>) -> Vec<i32> {
        let mut final_name = vec![-1_i32; 1_000_001];
        for operation in operations.iter().rev() {
            let (replaced, replacement) = (operation[0], operation[1]);
            final_name[replaced as usize] = match final_name[replacement as usize] {
                -1 => replacement,
                resolved => resolved,
            };
        }
        nums.iter()
            .map(|&value| match final_name[value as usize] {
                -1 => value,
                resolved => resolved,
            })
            .collect()
    }
}
