impl Solution {
    // dp[i] = cheapest way to acquire everything from fruit i onward
    // when fruit i itself is purchased. Buying fruit i makes fruits
    // i+1..2i+1 free, so if that reaches the end dp[i] = prices[i];
    // otherwise the next purchase lands on some j in [i+1, 2i+2] and
    // dp[i] = prices[i] + min(dp[j]). Sweeping i right to left, that
    // window's edges only move left, so a monotonic window supplies the
    // minimum in O(1). Costs reach 1000 * 10^5 = 10^8, inside i32.
    pub fn minimum_coins(prices: Vec<i32>) -> i32 {
        let n = prices.len();
        let dp = &mut vec![0_i32; n];
        let mut win: Vec<usize> = Vec::with_capacity(n);
        let mut head = 0_usize;
        for i in (0..n).rev() {
            let j = i + 1;
            if j < n {
                while win.len() > head && dp[*win.last().unwrap()] > dp[j] {
                    win.pop();
                }
                win.push(j);
            }
            while head < win.len() && win[head] > 2 * i + 2 {
                head += 1;
            }
            dp[i] = if 2 * i + 1 >= n - 1 {
                prices[i]
            } else {
                prices[i] + dp[win[head]]
            };
        }
        dp[0]
    }
}
