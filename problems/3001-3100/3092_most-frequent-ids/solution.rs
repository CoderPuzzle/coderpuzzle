use std::collections::BinaryHeap;

impl Solution {
    pub fn most_frequent_ids(nums: Vec<i32>, freq: Vec<i32>) -> Vec<i64> {
        // Only one ID's count moves per step, so a lazy max-heap of (count,
        // id) snapshots answers "most frequent" without ever hunting down
        // the previous snapshot: push the touched ID's new count, then pop
        // entries whose count no longer matches the live table. A count can
        // reach 10^5 * 10^5 = 10^10, beyond i32, so counts are i64.
        let mut counts = vec![0i64; 100_001];
        let mut heap = BinaryHeap::new();
        let mut answer = Vec::with_capacity(nums.len());
        for i in 0..nums.len() {
            let ident = nums[i] as usize;
            counts[ident] += freq[i] as i64;
            heap.push((counts[ident], ident as i64));
            while let Some(&(count, id)) = heap.peek() {
                if count == counts[id as usize] {
                    break;
                }
                heap.pop();
            }
            answer.push(heap.peek().unwrap().0);
        }
        answer
    }
}
