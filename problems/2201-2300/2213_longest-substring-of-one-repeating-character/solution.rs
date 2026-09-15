// per-node summary: uniform prefix/suffix runs, best run, boundary chars
struct SegTree {
    pref: Vec<i32>,
    suf: Vec<i32>,
    best: Vec<i32>,
    seg_len: Vec<i32>,
    left_char: Vec<u8>,
    right_char: Vec<u8>,
    chars: Vec<u8>,
}

impl SegTree {
    fn new(s: &[u8]) -> SegTree {
        let n = s.len();
        let mut t = SegTree {
            pref: vec![0; 4 * n],
            suf: vec![0; 4 * n],
            best: vec![0; 4 * n],
            seg_len: vec![0; 4 * n],
            left_char: vec![0; 4 * n],
            right_char: vec![0; 4 * n],
            chars: s.to_vec(),
        };
        t.build(1, 0, n - 1);
        t
    }

    fn pull(&mut self, node: usize) {
        let (l, r) = (2 * node, 2 * node + 1);
        self.seg_len[node] = self.seg_len[l] + self.seg_len[r];
        self.left_char[node] = self.left_char[l];
        self.right_char[node] = self.right_char[r];
        // prefix spans into the right child only if the left child is one
        // whole run and the boundary characters agree
        if self.pref[l] == self.seg_len[l] && self.left_char[l] == self.left_char[r] {
            self.pref[node] = self.pref[l] + self.pref[r];
        } else {
            self.pref[node] = self.pref[l];
        }
        if self.suf[r] == self.seg_len[r] && self.right_char[r] == self.right_char[l] {
            self.suf[node] = self.suf[r] + self.suf[l];
        } else {
            self.suf[node] = self.suf[r];
        }
        // a run may straddle the child boundary when the boundary chars agree
        let joined = if self.right_char[l] == self.left_char[r] {
            self.suf[l] + self.pref[r]
        } else {
            0
        };
        self.best[node] = self.best[l].max(self.best[r]).max(joined);
    }

    fn build(&mut self, node: usize, lo: usize, hi: usize) {
        if lo == hi {
            // a leaf is the trivial summary: a single run of length 1
            self.pref[node] = 1;
            self.suf[node] = 1;
            self.best[node] = 1;
            self.seg_len[node] = 1;
            self.left_char[node] = self.chars[lo];
            self.right_char[node] = self.chars[lo];
            return;
        }
        let mid = (lo + hi) / 2;
        self.build(2 * node, lo, mid);
        self.build(2 * node + 1, mid + 1, hi);
        self.pull(node);
    }

    fn update(&mut self, node: usize, lo: usize, hi: usize, pos: usize, ch: u8) {
        if lo == hi {
            self.chars[pos] = ch;
            self.left_char[node] = ch;
            self.right_char[node] = ch;
            return;
        }
        let mid = (lo + hi) / 2;
        if pos <= mid {
            self.update(2 * node, lo, mid, pos, ch);
        } else {
            self.update(2 * node + 1, mid + 1, hi, pos, ch);
        }
        // recompute the O(log n) nodes on the path back to the root
        self.pull(node);
    }
}

impl Solution {
    pub fn longest_repeating(s: String, queryCharacters: String, queryIndices: Vec<i32>) -> Vec<i32> {
        let n = s.len();
        if n == 0 {
            return Vec::new();
        }
        let mut tree = SegTree::new(s.as_bytes());
        let mut result = Vec::with_capacity(queryIndices.len());
        for (i, &idx) in queryIndices.iter().enumerate() {
            tree.update(1, 0, n - 1, idx as usize, queryCharacters.as_bytes()[i]);
            // the root's best is the answer after each point update
            result.push(tree.best[1]);
        }
        result
    }
}
