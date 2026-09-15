use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn max_spending(values: Vec<Vec<i32>>) -> i64 {
        // Each row is non-increasing, so a shop's cheapest unbought item
        // always sits at the moving tail. Buying the globally cheapest
        // tail on each (cheapest-first) day pairs every value with the
        // smallest day it can still take, which an exchange argument
        // shows is optimal: swapping any two days' purchases never pays.
        let mut tails: BinaryHeap<Reverse<(i64, usize, usize)>> = BinaryHeap::new();
        for (shop, row) in values.iter().enumerate() {
            tails.push(Reverse((i64::from(row[row.len() - 1]), shop, row.len() - 1)));
        }
        let days = (values.len() * values[0].len()) as i64;
        let mut total = 0i64;
        for day in 1..=days {
            let Reverse((value, shop, position)) = tails.pop().unwrap();
            total += value * day;
            if position > 0 {
                tails.push(Reverse((i64::from(values[shop][position - 1]), shop, position - 1)));
            }
        }
        total
    }
}
