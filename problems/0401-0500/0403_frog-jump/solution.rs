use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn can_cross(stones: Vec<i64>) -> bool {
        let n = stones.len();
        let mut index: HashMap<i64, usize> = HashMap::with_capacity(n);
        for (i, &pos) in stones.iter().enumerate() {
            index.insert(pos, i);
        }
        // jumps[i] = set of last-jump sizes that can land on stone i
        let mut jumps: Vec<HashSet<i64>> = (0..n).map(|_| HashSet::new()).collect();
        jumps[0].insert(0);
        for i in 0..n {
            let last_list: Vec<i64> = jumps[i].iter().copied().collect();
            for last in last_list {
                for step in [last - 1, last, last + 1] {
                    if step <= 0 {
                        continue;
                    }
                    let target = stones[i] + step;
                    if let Some(&j) = index.get(&target) {
                        if j > i {
                            jumps[j].insert(step);
                        }
                    }
                }
            }
        }
        !jumps[n - 1].is_empty()
    }
}
