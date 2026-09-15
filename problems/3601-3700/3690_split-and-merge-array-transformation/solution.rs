use std::collections::HashSet;
use std::collections::VecDeque;

impl Solution {
    pub fn min_split_merge(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        // Every operation costs exactly one layer, so breadth-first search
        // from nums1 reaches nums2 along a shortest operation sequence; the
        // whole state space holds at most n! <= 720 arrays.
        if nums1 == nums2 {
            return 0;
        }
        let n = nums1.len();
        let mut seen: HashSet<Vec<i32>> = HashSet::new();
        let mut queue: VecDeque<Vec<i32>> = VecDeque::new();
        seen.insert(nums1.clone());
        queue.push_back(nums1.clone());
        let mut steps = 0;
        while !queue.is_empty() {
            steps += 1;
            for _ in 0..queue.len() {
                let state = queue.pop_front().unwrap();
                // Cut every subarray [l..r] (single elements included) and
                // paste it at every slot of the remainder.
                for l in 0..n {
                    for r in l..n {
                        let mut rest: Vec<i32> = Vec::with_capacity(n);
                        rest.extend_from_slice(&state[..l]);
                        rest.extend_from_slice(&state[r + 1..]);
                        let piece = &state[l..=r];
                        for i in 0..=rest.len() {
                            let mut next: Vec<i32> = Vec::with_capacity(n);
                            next.extend_from_slice(&rest[..i]);
                            next.extend_from_slice(piece);
                            next.extend_from_slice(&rest[i..]);
                            if next == nums2 {
                                return steps;
                            }
                            if seen.insert(next.clone()) {
                                queue.push_back(next);
                            }
                        }
                    }
                }
            }
        }
        -1 // unreachable: nums2 is guaranteed to be a permutation
    }
}
