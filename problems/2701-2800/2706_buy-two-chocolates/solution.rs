impl Solution {
    // The cheapest pair is the two smallest prices; one pass tracks
    // them without sorting.
    pub fn buy_choco(prices: Vec<i32>, money: i32) -> i32 {
        let mut first = 101;
        let mut second = 101;
        for &price in &prices {
            if price < first {
                second = first;
                first = price;
            } else if price < second {
                second = price;
            }
        }
        if first + second > money {
            money
        } else {
            money - first - second
        }
    }
}
