use std::collections::{HashMap, VecDeque};

impl Solution {
    fn longest_with_delta(s: &[u8], target: i32, cap: usize) -> i32 {
        let mut prefix = vec![0i32; s.len() + 1];
        let mut positions: HashMap<i32, VecDeque<usize>> = HashMap::new();
        positions.entry(0).or_default().push_back(0);
        let mut best = 0usize;
        for right in 1..=s.len() {
            prefix[right] = prefix[right - 1] + if s[right - 1] == b'1' { 1 } else { -1 };
            if right > cap {
                let expired = right - cap - 1;
                if let Some(queue) = positions.get_mut(&prefix[expired]) {
                    if queue.front() == Some(&expired) {
                        queue.pop_front();
                    }
                }
            }
            if let Some(queue) = positions.get(&(prefix[right] - target)) {
                if let Some(&left) = queue.front() {
                    best = best.max(right - left);
                }
            }
            positions.entry(prefix[right]).or_default().push_back(right);
        }
        best as i32
    }

    pub fn longest_balanced(s: String) -> i32 {
        let bytes = s.as_bytes();
        let zeros = bytes.iter().filter(|&&ch| ch == b'0').count();
        let ones = bytes.len() - zeros;
        Self::longest_with_delta(bytes, 0, bytes.len())
            .max(Self::longest_with_delta(bytes, 2, 2 * zeros))
            .max(Self::longest_with_delta(bytes, -2, 2 * ones))
    }
}
