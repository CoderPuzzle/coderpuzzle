// Wealth is a per-row quantity: each customer's wealth is the sum of
// their row, and the answer is the largest of those sums. Every balance
// is at least 1, so a running maximum seeded at 0 is always overwritten
// by the first row.
impl Solution {
    pub fn maximum_wealth(accounts: Vec<Vec<i32>>) -> i32 {
        let mut richest = 0;
        for row in &accounts {
            let wealth: i32 = row.iter().sum();
            richest = richest.max(wealth);
        }
        richest
    }
}
