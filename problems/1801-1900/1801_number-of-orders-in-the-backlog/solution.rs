use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn get_number_of_backlog_orders(orders: Vec<Vec<i32>>) -> i32 {
        // Two heaps: sells as a min-heap on price (Reverse), buys as the
        // natural max-heap. An incoming batch trades with the best-priced
        // opposing batch while the price condition holds; only its unmatched
        // remainder joins the backlog as one new batch.
        let mut sells: BinaryHeap<Reverse<(i64, i64)>> = BinaryHeap::new();
        let mut buys: BinaryHeap<(i64, i64)> = BinaryHeap::new();
        for order in &orders {
            let price = order[0] as i64;
            let mut amount = order[1] as i64;
            if order[2] == 0 {
                while amount > 0 && sells.peek().map_or(false, |&Reverse((p, _))| p <= price) {
                    let mut top = sells.peek().unwrap().0;
                    let take = amount.min(top.1);
                    amount -= take;
                    top.1 -= take;
                    if top.1 == 0 {
                        sells.pop();
                    } else {
                        *sells.peek_mut().unwrap() = Reverse(top);
                    }
                }
                if amount > 0 {
                    buys.push((price, amount));
                }
            } else {
                while amount > 0 && buys.peek().map_or(false, |&(p, _)| p >= price) {
                    let mut top = *buys.peek().unwrap();
                    let take = amount.min(top.1);
                    amount -= take;
                    top.1 -= take;
                    if top.1 == 0 {
                        buys.pop();
                    } else {
                        *buys.peek_mut().unwrap() = top;
                    }
                }
                if amount > 0 {
                    sells.push(Reverse((price, amount)));
                }
            }
        }
        // Totals reach 1e5 * 1e9 = 1e14, so the sum is accumulated in
        // 64-bit integers and reduced modulo 1e9 + 7 at the end.
        let total: i64 = sells.iter().map(|r| r.0 .1).sum::<i64>() + buys.iter().map(|t| t.1).sum::<i64>();
        (total % 1_000_000_007) as i32
    }
}
