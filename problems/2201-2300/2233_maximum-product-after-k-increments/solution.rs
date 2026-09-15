use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn maximum_product(nums: Vec<i32>, k: i32) -> i32 {
        let mut heap: BinaryHeap<Reverse<i64>> = nums.into_iter().map(|value| Reverse(value as i64)).collect();
        for _ in 0..k {
            let Reverse(smallest) = heap.pop().expect("non-empty");
            heap.push(Reverse(smallest + 1));
        }
        let mut product: i64 = 1;
        for Reverse(value) in heap {
            product = product * value % 1_000_000_007;
        }
        product as i32
    }
}
