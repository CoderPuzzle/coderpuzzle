use std::cmp::Reverse;
use std::collections::hash_map::DefaultHasher;
use std::collections::{BinaryHeap, HashSet};
use std::hash::{Hash, Hasher};

impl Solution {
    pub fn kth_smallest(mat: Vec<Vec<i32>>, k: i32) -> i32 {
        let m = mat.len();
        let first: Vec<usize> = vec![0; m];
        let base: i32 = mat.iter().map(|row| row[0]).sum();
        let mut heap: BinaryHeap<Reverse<(i32, Vec<usize>)>> = BinaryHeap::new();
        heap.push(Reverse((base, first.clone())));
        let mut seen: HashSet<Vec<usize>> = HashSet::new();
        seen.insert(first);
        let mut answer = 0;
        for _ in 0..k {
            let Reverse((total, indexes)) = heap.pop().unwrap();
            answer = total;
            for r in 0..m {
                if indexes[r] + 1 < mat[r].len() {
                    let mut candidate = indexes.clone();
                    candidate[r] = indexes[r] + 1;
                    if seen.insert(candidate.clone()) {
                        let next_total = total - mat[r][indexes[r]] + mat[r][indexes[r] + 1];
                        heap.push(Reverse((next_total, candidate)));
                    }
                }
            }
        }
        answer
    }
}
