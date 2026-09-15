use std::collections::HashMap;

impl Solution {
    pub fn longest_valid_substring(word: String, forbidden: Vec<String>) -> i32 {
        const MISS: usize = usize::MAX;
        // Aho-Corasick automaton over the forbidden strings. Children live in
        // one map keyed node * 32 + char, so memory tracks the trie's edge
        // count instead of any alphabet-wide table.
        let mut children: HashMap<usize, usize> = HashMap::new();
        let mut max_len = 0usize;
        for s in &forbidden {
            max_len = max_len.max(s.len());
        }
        let mut levels: Vec<Vec<usize>> = vec![Vec::new(); max_len + 1];
        let mut fail: Vec<usize> = vec![0];
        let mut best: Vec<usize> = vec![MISS];
        let mut parent: Vec<usize> = vec![0];
        let mut pch: Vec<usize> = vec![0];
        for s in &forbidden {
            let bytes = s.as_bytes();
            let mut cur = 0usize;
            for (i, &byte) in bytes.iter().enumerate() {
                let c = (byte - b'a') as usize;
                let key = cur * 32 + c;
                let nxt = match children.get(&key) {
                    Some(&existing) => existing,
                    None => {
                        let node = fail.len();
                        children.insert(key, node);
                        fail.push(0);
                        best.push(MISS);
                        parent.push(cur);
                        pch.push(c);
                        levels[i + 1].push(node);
                        node
                    }
                };
                cur = nxt;
            }
            best[cur] = best[cur].min(s.len());
        }
        // Failure links, breadth-first over depth buckets: fail[u] is the
        // longest proper suffix of u's path that is also a trie path. Folding
        // best along each link tells every node the shortest forbidden string
        // ending there, with no occurrence enumeration at scan time.
        for depth in 1..=max_len {
            for &u in &levels[depth] {
                let c = pch[u];
                let mut f = fail[parent[u]];
                while f != 0 && !children.contains_key(&(f * 32 + c)) {
                    f = fail[f];
                }
                let v = children.get(&(f * 32 + c)).copied().unwrap_or(0);
                fail[u] = if v == u { 0 } else { v };
                best[u] = best[u].min(best[fail[u]]);
            }
        }
        let w = word.as_bytes();
        let n = w.len();
        let mut left: usize = 0;
        let mut ans: usize = 0;
        let mut state: usize = 0;
        // Longest-match scan: the state is always the longest suffix of the
        // text that prefixes some forbidden string, so each character costs
        // one amortized-constant hop instead of the window variant's L probes.
        for right in 0..n {
            let c = (w[right] - b'a') as usize;
            while state != 0 && !children.contains_key(&(state * 32 + c)) {
                state = fail[state];
            }
            state = children.get(&(state * 32 + c)).copied().unwrap_or(0);
            // The shortest forbidden suffix ending at right starts latest --
            // exactly the match the window variant jumps at -- so hopping the
            // left end past its first character keeps the same sweep.
            let m = best[state];
            if m != MISS {
                let jump = right + 2 - m;
                if jump > left {
                    left = jump;
                }
            }
            if right - left + 1 > ans {
                ans = right - left + 1;
            }
        }
        ans as i32
    }
}
