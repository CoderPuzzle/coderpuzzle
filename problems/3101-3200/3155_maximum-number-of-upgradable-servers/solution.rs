impl Solution {
    // For one data center, upgrading u servers is feasible exactly when
    // selling some of the remaining servers can bridge the shortfall: u *
    // upgrade may exceed money only if ceil(shortfall / sell) extra servers
    // sold still leave u un-upgraded hosts. Feasibility never flips back
    // as u grows, so a binary search on u finds the maximum. Products
    // reach 10^5 * 10^5 = 10^10, past i32 range: compute in i64.
    pub fn max_upgrades(count: Vec<i32>, upgrade: Vec<i32>, sell: Vec<i32>, money: Vec<i32>) -> Vec<i32> {
        let mut answer = Vec::with_capacity(count.len());
        for i in 0..count.len() {
            let mut lo: i32 = 0;
            let mut hi: i32 = count[i];
            while lo < hi {
                let mid = lo + (hi - lo + 1) / 2;
                let spent = mid as i64 * upgrade[i] as i64;
                let feasible = if spent <= money[i] as i64 {
                    true
                } else {
                    let shortfall = spent - money[i] as i64;
                    let to_sell = (shortfall + sell[i] as i64 - 1) / sell[i] as i64;
                    to_sell + mid as i64 <= count[i] as i64
                };
                if feasible {
                    lo = mid;
                } else {
                    hi = mid - 1;
                }
            }
            answer.push(lo);
        }
        answer
    }
}
