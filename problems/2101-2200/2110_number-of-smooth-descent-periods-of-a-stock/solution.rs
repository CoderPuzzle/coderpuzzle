impl Solution {
    pub fn get_descent_periods(prices: Vec<i32>) -> i64 {
        let mut run = 1_i64;
        let mut total = 1_i64;
        for index in 1..prices.len() {
            run = if prices[index - 1] - prices[index] == 1 {
                run + 1
            } else {
                1
            };
            total += run;
        }
        total
    }
}
