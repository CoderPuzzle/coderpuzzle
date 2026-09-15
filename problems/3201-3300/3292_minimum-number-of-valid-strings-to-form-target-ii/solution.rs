use std::collections::{HashMap, VecDeque};

// dp[p] is the minimum number of valid strings forming target[:p]; dp[0] is 0
// and every other cell starts out unreachable. An Aho-Corasick automaton over
// words turns one left-to-right scan of target into, at each index j, the
// length of the longest suffix of target[:j+1] that is a prefix of some word:
// every automaton state lies on a trie path, so that length is simply the
// state's depth. A piece ending at j + 1 therefore starts somewhere inside its
// last r positions, and a min segment tree over finalized dp cells answers
// each such window in O(log n): point-update dp[j + 1], then move on. The
// scan stops dead the moment a character extends no word prefix at all -
// nothing beyond that position is reachable, so the answer is -1 unless the
// full length was formed. All values fit an i32.
impl Solution {
    pub fn min_valid_strings(words: Vec<String>, target: String) -> i32 {
        let mut children: Vec<HashMap<u8, usize>> = vec![HashMap::new()];
        let mut fail: Vec<usize> = vec![0];
        for word in &words {
            let mut cur = 0usize;
            for &b in word.as_bytes() {
                if let Some(&next) = children[cur].get(&b) {
                    cur = next;
                } else {
                    children.push(HashMap::new());
                    fail.push(0);
                    let next = children.len() - 1;
                    children[cur].insert(b, next);
                    cur = next;
                }
            }
        }
        let mut bfs = VecDeque::new();
        for &v in children[0].values() {
            bfs.push_back(v);
        }
        while let Some(u) = bfs.pop_front() {
            for (&ch, &v) in children[u].clone().iter() {
                let mut f = fail[u];
                while f > 0 && !children[f].contains_key(&ch) {
                    f = fail[f];
                }
                let nf = children[f].get(&ch).copied().unwrap_or(0);
                fail[v] = if nf == v { 0 } else { nf };
                bfs.push_back(v);
            }
        }
        let mut depth = vec![0usize; children.len()];
        for u in 0..children.len() {
            for &v in children[u].values() {
                depth[v] = depth[u] + 1;
            }
        }
        const INF: i32 = 1 << 30;
        let n = target.len();
        let mut size = 1usize;
        while size < n + 2 {
            size <<= 1;
        }
        let mut tree = vec![INF; 2 * size];
        let update = |tree: &mut Vec<i32>, i: usize, value: i32| {
            let mut i = i + size;
            tree[i] = value;
            i >>= 1;
            while i > 0 {
                tree[i] = tree[2 * i].min(tree[2 * i + 1]);
                i >>= 1;
            }
        };
        let query = |tree: &Vec<i32>, lo: usize, hi: usize| -> i32 {
            let (mut lo, mut hi) = (lo + size, hi + size);
            let mut res = INF;
            while lo < hi {
                if lo & 1 != 0 {
                    res = res.min(tree[lo]);
                    lo += 1;
                }
                if hi & 1 != 0 {
                    hi -= 1;
                    res = res.min(tree[hi]);
                }
                lo >>= 1;
                hi >>= 1;
            }
            res
        };
        update(&mut tree, 0, 0);
        let bytes = target.as_bytes();
        let mut cur = 0usize;
        for j in 0..n {
            let ch = bytes[j];
            while cur > 0 && !children[cur].contains_key(&ch) {
                cur = fail[cur];
            }
            cur = children[cur].get(&ch).copied().unwrap_or(0);
            if cur == 0 {
                return -1;
            }
            let lo = (j + 1).saturating_sub(depth[cur]);
            let best = query(&tree, lo, j + 1);
            if best != INF {
                update(&mut tree, j + 1, best + 1);
            }
        }
        let ans = query(&tree, n, n + 1);
        if ans >= INF {
            -1
        } else {
            ans
        }
    }
}
