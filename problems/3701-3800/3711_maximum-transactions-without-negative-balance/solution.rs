use std::collections::BinaryHeap;

impl Solution {
    pub fn max_transactions(transactions: Vec<i32>) -> i32 {
        // Greedy scan with a max-heap of the debits already taken: take every
        // transaction that leaves the balance nonnegative, and when a debit
        // does not fit, refund the largest debit taken earlier if it was
        // strictly bigger and take the smaller one instead — same count, a
        // higher balance, and room for later, smaller debits. Running
        // balances reach 10^14, past 32-bit range, so accumulate in 64-bit.
        let mut balance: i64 = 0;
        let mut kept: i32 = 0;
        let mut debits: BinaryHeap<i64> = BinaryHeap::new();
        for &t in &transactions {
            let amount = t as i64;
            if t >= 0 || balance + amount >= 0 {
                kept += 1;
                balance += amount;
                if t < 0 {
                    debits.push(-amount);
                }
            } else {
                let want = -amount;
                if debits.peek().map_or(false, |&top| top > want) {
                    balance += debits.pop().unwrap(); // refund the larger debit
                    balance += amount;
                    debits.push(want);
                }
            }
        }
        kept
    }
}
