use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

impl Solution {
    pub fn top_k_frequent(nums: Vec<i32>, k: i32) -> Vec<i32> {
        // One counting pass over the array.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for &x in &nums {
            *counts.entry(x).or_insert(0) += 1;
        }
        // Size-k heap of (count, Reverse(value)) where the root is the
        // weakest keeper: smallest count, and among equal counts the
        // largest value — eviction order mirrors the final ranking.
        let mut heap: BinaryHeap<Reverse<(i32, Reverse<i32>)>> = BinaryHeap::new();
        for (&value, &count) in counts.iter() {
            let item = (count, Reverse(value));
            if heap.len() < k as usize {
                heap.push(Reverse(item));
                continue;
            }
            let root = heap.peek().unwrap().0;
            // Replace the root only when the newcomer outranks it:
            // higher count, or equal count and smaller value.
            if item > root {
                heap.pop();
                heap.push(Reverse(item));
            }
        }
        let mut survivors: Vec<(i32, Reverse<i32>)> = heap.into_iter().map(|Reverse(item)| item).collect();
        // Survivors are exactly the top k by (higher count, then smaller
        // value); emit them in that order.
        survivors.sort_by(|a, b| if a.0 != b.0 { b.0.cmp(&a.0) } else { a.1.cmp(&b.1) });
        survivors
            .into_iter()
            .take(k as usize)
            .map(|(_, Reverse(value))| value)
            .collect()
    }
}
