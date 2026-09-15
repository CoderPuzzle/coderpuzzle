impl Solution {
    pub fn get_probability(balls: Vec<i32>) -> f64 {
        let total: i32 = balls.iter().sum();
        let half = (total / 2) as usize;
        let denominator = binomial(total as i64, half as i64);
        let numerator = walk(&balls, 0, half, 0, 0);
        numerator as f64 / denominator as f64
    }
}

// Sum of per-color binomial products over the completions whose two
// boxes end with equal distinct-color counts.
fn walk(balls: &[i32], index: usize, remaining: usize, distinct1: usize, distinct2: usize) -> i64 {
    if index == balls.len() {
        return if remaining == 0 && distinct1 == distinct2 { 1 } else { 0 };
    }
    let count = balls[index] as usize;
    let mut ways: i64 = 0;
    let limit = count.min(remaining);
    for x in 0..=limit {
        let d1 = distinct1 + (x > 0) as usize;
        let d2 = distinct2 + (x < count) as usize;
        ways += binomial(count as i64, x as i64) * walk(balls, index + 1, remaining - x, d1, d2);
    }
    ways
}

fn binomial(n: i64, k: i64) -> i64 {
    let mut result: i64 = 1;
    for i in 1..=k {
        result = result * (n - k + i) / i;
    }
    result
}
