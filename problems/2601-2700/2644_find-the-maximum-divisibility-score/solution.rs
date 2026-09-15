impl Solution {
    pub fn max_div_score(nums: Vec<i32>, divisors: Vec<i32>) -> i32 {
        // Brute-force scoring straight from the statement: for every divisor
        // walk all of nums once. At most 1000 * 1000 = 10^6 modulo checks,
        // which fits the limits with room to spare.
        let mut best_score = -1;
        let mut best_divisor = 0;
        for divisor in divisors {
            let mut score = 0;
            for &value in &nums {
                if value % divisor == 0 {
                    score += 1;
                }
            }
            // Strictly larger wins outright; equal scores go to the smaller
            // divisor, which is exactly what `<` checks here.
            if score > best_score || (score == best_score && divisor < best_divisor) {
                best_score = score;
                best_divisor = divisor;
            }
        }
        best_divisor
    }
}
