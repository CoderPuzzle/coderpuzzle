use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn max_score(nums1: Vec<i32>, nums2: Vec<i32>, k: i32) -> i64 {
        let n = nums1.len();
        let mut idx: Vec<usize> = (0..n).collect();
        // Enumerate which element provides the min(nums2): sweeping indices
        // in descending nums2 order means everything already seen has
        // nums2 >= b, so b is the minimum of any set drawn from seen pairs.
        idx.sort_by(|&a, &b| nums2[b].cmp(&nums2[a]));
        let mut heap: BinaryHeap<Reverse<i64>> = BinaryHeap::new();
        let mut total: i64 = 0;
        let mut best: i64 = 0;
        for &j in &idx {
            let a = nums1[j] as i64;
            heap.push(Reverse(a));
            total += a;
            // Min-heap of size k with a running sum holds the k largest nums1
            // seen so far; ejecting the smallest keeps the top-k sum correct.
            if heap.len() > k as usize {
                total -= heap.pop().unwrap().0;
            }
            // With k companions available, total * nums2[j] is the best score
            // under the assumption that nums2[j] is the minimum; take the max
            // over the sweep. Ties in nums2 are safe: the last of them still
            // sees all the others in the heap.
            if heap.len() == k as usize {
                let b = total * nums2[j] as i64;
                if b > best {
                    best = b;
                }
            }
        }
        best
    }
}
