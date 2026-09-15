use std::collections::HashMap;

impl Solution {
    pub fn count_palindrome_paths(parent: Vec<i32>, s: String) -> i64 {
        let n = parent.len();
        let s = s.as_bytes();
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 1..n {
            children[parent[i] as usize].push(i);
        }

        // mask[v]: parity bitmask of letters on the root-to-v path; a
        // multiset forms a palindrome iff at most one parity is odd, so only
        // parities matter. BFS from the root derives each child's mask as
        // its parent's XOR the edge letter's bit.
        let mut masks = vec![0u32; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0usize);
        let mut qi = 0usize;
        while qi < order.len() {
            let v = order[qi];
            qi += 1;
            for &c in &children[v] {
                masks[c] = masks[v] ^ (1u32 << ((s[c] - b'a') as u32));
                order.push(c);
            }
        }

        let mut freq: HashMap<u32, i64> = HashMap::new();
        let mut ans: i64 = 0;
        for &m in &masks {
            // Path letters between u and v have parity mask[u] ^ mask[v] —
            // the shared prefix above their LCA cancels — so partners are
            // masks equal to m (all even) or one bit away (single odd).
            // Consulting before inserting counts each pair exactly once.
            if let Some(&c) = freq.get(&m) {
                ans += c;
            }
            for b in 0..26u32 {
                if let Some(&c) = freq.get(&(m ^ (1u32 << b))) {
                    ans += c;
                }
            }
            *freq.entry(m).or_insert(0) += 1;
        }
        ans
    }
}
