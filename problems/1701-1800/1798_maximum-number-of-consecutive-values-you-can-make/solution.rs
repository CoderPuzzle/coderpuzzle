impl Solution {
    pub fn get_maximum_consecutive(coins: Vec<i32>) -> i32 {
        let mut sorted = coins;
        sorted.sort_unstable();
        // Invariant: every value in [0, reachable] is makeable as a subset sum.
        let mut reachable = 0i32;
        for coin in sorted {
            if coin > reachable + 1 {
                // Gap at reachable + 1; later coins are larger, so it can never be closed.
                break;
            }
            // Cheapest coin extends the contiguous range to reachable + coin.
            reachable += coin;
        }
        // Count of consecutive makeable values 0..reachable.
        reachable + 1
    }
}
