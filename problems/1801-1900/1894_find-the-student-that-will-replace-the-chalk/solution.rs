impl Solution {
    // Whole rounds consume sum(chalk); simulate only the remainder.
    pub fn chalk_replacer(chalk: Vec<i32>, k: i64) -> i32 {
        let mut rem = k % chalk.iter().map(|&c| c as i64).sum::<i64>();
        for (i, &c) in chalk.iter().enumerate() {
            if rem < c as i64 {
                return i as i32;
            }
            rem -= c as i64;
        }
        unreachable!() // remainder < total
    }
}
