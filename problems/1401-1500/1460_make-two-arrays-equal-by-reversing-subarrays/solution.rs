impl Solution {
    pub fn can_be_equal(target: Vec<i32>, arr: Vec<i32>) -> bool {
        let mut counts = vec![0i32; 1001];
        for value in &target {
            counts[*value as usize] += 1;
        }
        for value in &arr {
            counts[*value as usize] -= 1;
        }
        counts.iter().all(|&count| count == 0)
    }
}
