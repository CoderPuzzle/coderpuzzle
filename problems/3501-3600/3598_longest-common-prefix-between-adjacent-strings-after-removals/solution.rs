impl Solution {
    pub fn longest_common_prefix(words: Vec<String>) -> Vec<i32> {
        // Removing words[i] keeps every adjacent pair except (i-1, i) and
        // (i, i+1), and adds the single new pair (i-1, i+1). With
        // adj[j] = lcp(words[j], words[j+1]), the best surviving old pair
        // is the max of adj[0..i-2] and adj[i+1..n-2] — pre/suffix maxima
        // answer that in O(1) — so each answer is the max of the left
        // max, the right max, and that one new LCP.
        let n = words.len();
        let lcp = |a: &str, b: &str| -> usize {
            let limit = a.len().min(b.len());
            let (a, b) = (a.as_bytes(), b.as_bytes());
            let mut j = 0;
            while j < limit && a[j] == b[j] {
                j += 1;
            }
            j
        };
        let mut adj = vec![0usize; n.saturating_sub(1)];
        for i in 0..n.saturating_sub(1) {
            adj[i] = lcp(&words[i], &words[i + 1]);
        }

        let mut pre = vec![0usize; n]; // max(adj[0..i-2]) — best pair fully left of i
        for i in 2..n {
            pre[i] = pre[i - 1].max(adj[i - 2]);
        }
        let mut suf = vec![0usize; n]; // max(adj[i+1..n-2]) — best pair fully right of i
        for i in (0..n.saturating_sub(2)).rev() {
            suf[i] = suf[i + 1].max(adj[i + 1]);
        }

        let mut answer = vec![0i32; n];
        for i in 0..n {
            let mut best = pre[i].max(suf[i]);
            if i > 0 && i < n - 1 {
                best = best.max(lcp(&words[i - 1], &words[i + 1]));
            }
            answer[i] = best as i32;
        }
        answer
    }
}
