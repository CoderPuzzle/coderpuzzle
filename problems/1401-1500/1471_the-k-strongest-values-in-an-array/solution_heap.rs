use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn get_strongest(arr: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let mut sorted_arr = arr.clone();
        sorted_arr.sort();
        let m = sorted_arr[(arr.len() - 1) / 2];
        // Size-k heap of (distance, value, Reverse(index)) whose root is
        // the weakest keeper: shortest distance, then smallest value, then
        // latest index — a later duplicate can never outrank an earlier
        // one.
        let mut heap: BinaryHeap<Reverse<(i32, i32, Reverse<i32>)>> = BinaryHeap::new();
        for (i, &v) in arr.iter().enumerate() {
            let entry = ((v - m).abs(), v, Reverse(i as i32));
            if heap.len() < k {
                heap.push(Reverse(entry));
                continue;
            }
            let root = heap.peek().unwrap().0;
            // Replace the root only when the newcomer is strictly mightier:
            // longer distance, or larger value on a distance tie (an exact
            // duplicate never displaces an earlier index).
            if entry > root {
                heap.pop();
                heap.push(Reverse(entry));
            }
        }
        let mut survivors: Vec<(i32, i32, Reverse<i32>)> = heap.into_iter().map(|Reverse(entry)| entry).collect();
        // The heap holds the top k; emit them by original index.
        survivors.sort_by_key(|entry| (entry.2).0);
        survivors.into_iter().map(|(_, v, _)| v).collect()
    }
}
