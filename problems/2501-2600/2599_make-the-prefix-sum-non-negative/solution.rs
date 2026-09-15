use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn make_pref_sum_non_negative(nums: Vec<i32>) -> i32 {
        let mut heap: BinaryHeap<Reverse<i64>> = BinaryHeap::new();
        let mut prefix: i64 = 0;
        let mut ops: i32 = 0;
        for &num in &nums {
            prefix += num as i64;
            // Every element seen so far is a deferral candidate; a negative
            // is handled not when read but at the first prefix it poisons.
            heap.push(Reverse(num as i64));
            // Prefix dipped below zero: defer the smallest element seen so
            // far to the end. Removing the minimum raises the prefix the
            // most, so by an exchange argument this uses the fewest ops.
            while prefix < 0 {
                prefix -= heap.pop().unwrap().0;
                ops += 1;
            }
        }
        ops
    }
}
