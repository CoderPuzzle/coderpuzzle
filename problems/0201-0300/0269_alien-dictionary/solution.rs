impl Solution {
    pub fn alien_order(words: Vec<String>) -> String {
        const A: usize = 26;
        let words: Vec<Vec<u8>> = words.iter().map(|w| w.as_bytes().to_vec()).collect();
        let mut present = [false; A];
        for w in &words {
            for &c in w {
                present[(c - b'a') as usize] = true;
            }
        }
        let total: usize = present.iter().filter(|&&p| p).count();

        let mut adj = vec![vec![false; A]; A];
        let mut indeg = [0i32; A];
        for i in 0..words.len().saturating_sub(1) {
            let prev = &words[i];
            let nxt = &words[i + 1];
            if prev.len() > nxt.len() && prev.starts_with(nxt) {
                return String::new(); // longer word before its own prefix -> invalid
            }
            let m = prev.len().min(nxt.len());
            for j in 0..m {
                let a = (prev[j] - b'a') as usize;
                let b = (nxt[j] - b'a') as usize;
                if a != b {
                    if !adj[a][b] {
                        adj[a][b] = true;
                        indeg[b] += 1;
                    }
                    break;
                }
            }
        }

        // Kahn's algorithm always taking the smallest available letter
        // (equivalent to a min-heap of ready characters).
        let mut done = [false; A];
        let mut order = String::with_capacity(total);
        for _ in 0..total {
            let mut ch: i32 = -1;
            for c in 0..A {
                if present[c] && !done[c] && indeg[c] == 0 {
                    ch = c as i32;
                    break;
                }
            }
            if ch < 0 {
                return String::new(); // cycle -> invalid
            }
            let ch = ch as usize;
            done[ch] = true;
            order.push((b'a' + ch as u8) as char);
            for nb in 0..A {
                if adj[ch][nb] {
                    indeg[nb] -= 1;
                }
            }
        }
        order
    }
}
