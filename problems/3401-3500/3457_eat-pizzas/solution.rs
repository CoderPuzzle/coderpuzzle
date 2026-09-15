impl Solution {
    // Odd days bank their maximum, so the ceil(d/2) odd days claim the
    // top weights first; each even day then banks the second pizza of a
    // consecutive top pair. The total reaches 5e9, so it accumulates in
    // an i64.
    pub fn max_weight(mut pizzas: Vec<i32>) -> i64 {
        pizzas.sort_unstable();
        let n = pizzas.len();
        let odd_days = (n / 4 + 1) / 2;
        let mut total = 0i64;
        let mut top = n - 1;
        for _ in 0..odd_days {
            total += pizzas[top] as i64;
            top -= 1;
        }
        for _ in 0..(n / 4 - odd_days) {
            top -= 1;
            total += pizzas[top] as i64;
            top -= 1;
        }
        total
    }
}
