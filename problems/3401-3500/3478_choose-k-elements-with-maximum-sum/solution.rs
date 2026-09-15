use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn find_max_sum(nums1: Vec<i32>, nums2: Vec<i32>, k: i32) -> Vec<i32> {
        let n = nums1.len();
        let mut indices: Vec<usize> = (0..n).collect();
        // sweep indices by increasing nums1: each query pools the strictly smaller values
        indices.sort_by_key(|&i| nums1[i]);
        let mut heap: BinaryHeap<Reverse<i64>> = BinaryHeap::new(); // min-heap of top-k nums2 values
        let mut total: i64 = 0;
        let mut result = vec![0i32; n];
        let mut i = 0usize;
        while i < n {
            let mut j = i;
            while j < n && nums1[indices[j]] == nums1[indices[i]] {
                j += 1;
            }
            // strict <: the equal-value block is answered before its own values join
            for t in i..j {
                result[indices[t]] = total as i32;
            }
            // pool invariant: the heap holds the top-k nums2 so far, total their sum
            for t in i..j {
                // evict the current minimum only when the newcomer beats it
                let val = nums2[indices[t]] as i64;
                if heap.len() < k as usize {
                    heap.push(Reverse(val));
                    total += val;
                } else if val > heap.peek().unwrap().0 {
                    total += val - heap.pop().unwrap().0;
                    heap.push(Reverse(val));
                }
            }
            i = j;
        }
        result
    }
}
