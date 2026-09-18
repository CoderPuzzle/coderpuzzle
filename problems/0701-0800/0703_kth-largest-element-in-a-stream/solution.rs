use std::cmp::Reverse;
use std::collections::BinaryHeap;

pub struct KthLargest {
    k: usize,
    // Reverse makes the max-heap a min-heap, so the root is the smallest
    // of the k largest scores — the kth largest of the whole pool.
    heap: BinaryHeap<Reverse<i32>>,
}

impl KthLargest {
    pub fn new(k: i32, nums: Vec<i32>) -> Self {
        let mut tracker = KthLargest {
            k: k as usize,
            heap: nums.into_iter().map(Reverse).collect(),
        };
        while tracker.heap.len() > tracker.k {
            tracker.heap.pop();
        }
        tracker
    }

    pub fn add(&mut self, val: i32) -> i32 {
        // Push first, then evict: a value smaller than the root pops right
        // back out, so no comparison branch is needed.
        self.heap.push(Reverse(val));
        if self.heap.len() > self.k {
            self.heap.pop();
        }
        self.heap.peek().unwrap().0
    }
}
