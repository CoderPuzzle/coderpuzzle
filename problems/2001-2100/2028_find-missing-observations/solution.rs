impl Solution {
    pub fn missing_rolls(rolls: Vec<i32>, mean: i32, n: i32) -> Vec<i32> {
        let observed_sum: i64 = rolls.iter().map(|&roll| i64::from(roll)).sum();
        let required = i64::from(mean) * (rolls.len() as i64 + i64::from(n)) - observed_sum;
        if required < i64::from(n) || required > 6 * i64::from(n) {
            return Vec::new();
        }

        let base = (required / i64::from(n)) as i32;
        let remainder = (required % i64::from(n)) as usize;
        let mut missing = vec![base; n as usize];
        for value in missing.iter_mut().take(remainder) {
            *value += 1;
        }
        missing
    }
}
