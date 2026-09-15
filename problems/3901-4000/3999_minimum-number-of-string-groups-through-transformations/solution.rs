use std::collections::HashSet;
impl Solution {
    fn booth(s: &[u8]) -> Vec<u8> {
        if s.is_empty() {
            return vec![];
        }
        let n = s.len();
        let z = [s, s].concat();
        let (mut i, mut j, mut k) = (0, 1, 0);
        while i < n && j < n && k < n {
            if z[i + k] == z[j + k] {
                k += 1;
                continue;
            }
            if z[i + k] > z[j + k] {
                i = i + k + 1;
                if i == j {
                    i += 1
                }
            } else {
                j = j + k + 1;
                if i == j {
                    j += 1
                }
            }
            k = 0
        }
        let p = i.min(j);
        z[p..p + n].to_vec()
    }
    pub fn minimum_groups(words: Vec<String>) -> i32 {
        let mut q = HashSet::new();
        for w in words {
            let b = w.as_bytes();
            let a: Vec<_> = b.iter().step_by(2).copied().collect();
            let c: Vec<_> = b.iter().skip(1).step_by(2).copied().collect();
            q.insert((Self::booth(&a), Self::booth(&c)));
        }
        q.len() as i32
    }
}
