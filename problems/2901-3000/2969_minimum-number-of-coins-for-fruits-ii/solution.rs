impl Solution {
    pub fn minimum_coins(prices: Vec<i32>) -> i32 {
        let n = prices.len();
        let mut dp = vec![0i64; n + 1];
        let mut dq: Vec<usize> = Vec::with_capacity(n + 1);
        let mut head = 0usize;

        let value = |l: usize, dp: &Vec<i64>, prices: &Vec<i32>| -> i64 { dp[l - 1] + prices[l - 1] as i64 };

        for i in 1..=n {
            while dq.len() > head && value(*dq.last().unwrap(), &dp, &prices) >= value(i, &dp, &prices) {
                dq.pop();
            }
            dq.push(i);
            let lo = (i + 1) / 2; // ceil(i / 2)
            while dq.len() > head && dq[head] < lo {
                head += 1;
            }
            dp[i] = value(dq[head], &dp, &prices);
        }
        dp[n] as i32
    }
}
