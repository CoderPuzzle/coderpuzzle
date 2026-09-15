use std::collections::VecDeque;

// 1-indexed Fenwick tree over the n original positions of s, tracking
// which positions of one particular digit are still unconsumed.
struct FenwickTree {
    size: usize,
    tree: Vec<i32>,
}

impl FenwickTree {
    fn new(size: usize) -> Self {
        FenwickTree {
            size,
            tree: vec![0; size + 1],
        }
    }

    fn add(&mut self, index: usize, delta: i32) {
        let mut index = index + 1;
        while index <= self.size {
            self.tree[index] += delta;
            index += index & index.wrapping_neg();
        }
    }

    fn prefix_count(&self, mut index: usize) -> i32 {
        let mut total = 0;
        while index > 0 {
            total += self.tree[index];
            index -= index & index.wrapping_neg();
        }
        total
    }
}

impl Solution {
    pub fn is_transformable(s: String, t: String) -> bool {
        let s_bytes = s.as_bytes();
        let t_bytes = t.as_bytes();
        let n = s_bytes.len();
        if t_bytes.len() != n {
            return false;
        }

        // queue[d]: original positions in s carrying digit d, oldest first.
        let mut queue: Vec<VecDeque<usize>> = vec![VecDeque::new(); 10];
        for (index, &byte) in s_bytes.iter().enumerate() {
            queue[(byte - b'0') as usize].push_back(index);
        }

        // fenwick[d] marks which occurrences of digit d are still
        // unconsumed, so a prefix query answers "how many remaining
        // digit-d positions sit left of index x".
        let mut fenwick: Vec<FenwickTree> = (0..10).map(|_| FenwickTree::new(n)).collect();
        for (index, &byte) in s_bytes.iter().enumerate() {
            fenwick[(byte - b'0') as usize].add(index, 1);
        }

        for &byte in t_bytes.iter() {
            let digit = (byte - b'0') as usize;
            let pos = match queue[digit].pop_front() {
                Some(pos) => pos,
                None => return false,
            };
            // any remaining strictly-smaller digit still left of pos
            // permanently blocks it: sorting only lets pos move left past
            // digits strictly greater than it, never past a smaller one.
            let mut blocked = 0;
            for smaller in 0..digit {
                blocked += fenwick[smaller].prefix_count(pos);
            }
            if blocked != 0 {
                return false;
            }
            fenwick[digit].add(pos, -1);
        }

        true
    }
}
