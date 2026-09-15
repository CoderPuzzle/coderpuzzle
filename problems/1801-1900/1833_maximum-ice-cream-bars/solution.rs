impl Solution {
    // Counting sort: tally each price, then sweep prices from cheapest.
    // Buying cheapest-first is optimal, and the tally makes that walk
    // O(max_price) instead of O(n log n).
    pub fn max_ice_cream(costs: Vec<i32>, coins: i32) -> i32 {
        let mut count = vec![0i32; 100_001];
        for c in &costs {
            count[*c as usize] += 1;
        }
        let mut bought = 0;
        let mut coins = coins as i64;
        for (price, &tally) in count.iter().enumerate().skip(1) {
            if tally == 0 || price as i64 > coins {
                continue;
            }
            let afford = (tally as i64).min(coins / price as i64);
            bought += afford;
            coins -= afford * price as i64;
            if coins == 0 {
                break;
            }
        }
        bought as i32
    }
}
