impl Solution {
    pub fn longest_common_prefix(words: Vec<String>, k: i32) -> Vec<i32> {
        let n = words.len();
        let k = k as usize;
        // With one word gone there are fewer than k words, so no prefix survives.
        if n - 1 < k {
            return vec![0; n];
        }

        let total: usize = words.iter().map(|w| w.len()).sum();
        let max_len = words.iter().map(|w| w.len()).max().unwrap_or(0);
        let cap = total + 1;
        let mut children: Vec<i32> = vec![-1; cap * 26];
        let mut cnt = vec![0usize; cap];
        let mut depth = vec![0usize; cap];
        let mut nodes: usize = 1;
        // A trie node at depth d is a prefix of length d shared by cnt words.
        for w in &words {
            let mut cur: usize = 0;
            cnt[0] += 1;
            for &b in w.as_bytes() {
                let idx = cur * 26 + (b - b'a') as usize;
                if children[idx] == -1 {
                    children[idx] = nodes as i32;
                    depth[nodes] = depth[cur] + 1;
                    nodes += 1;
                }
                cur = children[idx] as usize;
                cnt[cur] += 1;
            }
        }

        let mut top1: Vec<i64> = vec![-1; max_len + 1];
        let mut top2: Vec<i64> = vec![-1; max_len + 1];
        // Keep the two distinct nodes per depth with cnt >= k: if the removed
        // word's path covers the best one, the second is still off that path.
        for node in 0..nodes {
            if cnt[node] >= k {
                let d = depth[node];
                if top1[d] == -1 {
                    top1[d] = node as i64;
                } else if top2[d] == -1 {
                    top2[d] = node as i64;
                }
            }
        }
        let mut depths: Vec<usize> = Vec::new();
        for d in (0..=max_len).rev() {
            if top1[d] != -1 {
                depths.push(d);
            }
        }

        let mut stamp = vec![0i64; nodes];
        let mut ans = Vec::with_capacity(n);
        for wi in 0..n {
            let w = &words[wi];
            let tag = (wi + 1) as i64;
            // A unique timestamp marks this word's trie path; old marks never match.
            stamp[0] = tag;
            let mut cur: usize = 0;
            let mut big: usize = 0;
            // On-path node survives the removal only with cnt >= k + 1.
            for &b in w.as_bytes() {
                cur = children[cur * 26 + (b - b'a') as usize] as usize;
                stamp[cur] = tag;
                if cnt[cur] >= k + 1 && depth[cur] > big {
                    big = depth[cur];
                }
            }
            let mut fb: usize = 0;
            // Deepest off-path depth: top2 exists there, or top1 is off the path.
            for &d in &depths {
                if top2[d] != -1 {
                    fb = d;
                    break;
                }
                if stamp[top1[d] as usize] != tag {
                    fb = d;
                    break;
                }
            }
            ans.push(big.max(fb) as i32);
        }
        ans
    }
}
