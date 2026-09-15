impl Solution {
    // Induced subgraph on chars not in t must be acyclic.
    fn dfs(c: usize, adj: &Vec<Vec<usize>>, state: &mut Vec<u8>) -> bool {
        state[c] = 1;
        for &nxt in &adj[c] {
            if state[nxt] == 1 {
                return true;
            }
            if state[nxt] == 0 && Self::dfs(nxt, adj, state) {
                return true;
            }
        }
        state[c] = 2;
        false
    }

    fn is_dag(t: u32, non_self: &Vec<(usize, usize)>, m: usize) -> bool {
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); m];
        let mut state = vec![0u8; m]; // 0 unvisited, 1 visiting, 2 done
        for &(a, b) in non_self {
            if (t >> a) & 1 == 0 && (t >> b) & 1 == 0 {
                adj[a].push(b);
            }
        }
        for c in 0..m {
            if (t >> c) & 1 != 0 {
                continue;
            }
            if state[c] == 0 && Self::dfs(c, &adj, &mut state) {
                return false;
            }
        }
        true
    }

    pub fn supersequences(words: Vec<String>) -> Vec<Vec<i32>> {
        let mut present = [false; 26];
        for w in &words {
            let b = w.as_bytes();
            present[(b[0] - b'a') as usize] = true;
            present[(b[1] - b'a') as usize] = true;
        }
        let chars: Vec<usize> = (0..26).filter(|&i| present[i]).collect();
        let m = chars.len();
        let mut idx = [0usize; 26];
        for (i, &c) in chars.iter().enumerate() {
            idx[c] = i;
        }

        let mut forced: u32 = 0;
        let mut non_self: Vec<(usize, usize)> = Vec::new();
        for w in &words {
            let b = w.as_bytes();
            let (ca, cb) = ((b[0] - b'a') as usize, (b[1] - b'a') as usize);
            if ca == cb {
                forced |= 1 << idx[ca];
            } else {
                non_self.push((idx[ca], idx[cb]));
            }
        }

        let mut best_len: i64 = -1;
        let mut results: Vec<Vec<i32>> = Vec::new();
        for mask in 0u32..(1u32 << m) {
            if (forced & mask) != forced {
                continue;
            }
            if !Self::is_dag(mask, &non_self, m) {
                continue;
            }
            let length = m as i64 + mask.count_ones() as i64;
            let mut freq = vec![0i32; 26];
            for (i, &c) in chars.iter().enumerate() {
                freq[c] = if (mask >> i) & 1 != 0 { 2 } else { 1 };
            }
            if best_len == -1 || length < best_len {
                best_len = length;
                results.clear();
                results.push(freq);
            } else if length == best_len {
                results.push(freq);
            }
        }

        results.sort();
        results.dedup();
        results
    }
}
