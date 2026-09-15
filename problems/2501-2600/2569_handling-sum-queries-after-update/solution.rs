struct SegTree {
    n: usize,
    tree: Vec<i64>,
    lazy: Vec<bool>,
}

impl SegTree {
    fn new(arr: &[i32]) -> SegTree {
        let n = arr.len();
        let mut st = SegTree {
            n,
            tree: vec![0; 4 * n.max(1)],
            lazy: vec![false; 4 * n.max(1)],
        };
        if n > 0 {
            st.build(1, 0, (n - 1) as i64, arr);
        }
        st
    }

    fn build(&mut self, node: usize, lo: i64, hi: i64, arr: &[i32]) {
        if lo == hi {
            self.tree[node] = arr[lo as usize] as i64;
            return;
        }
        let mid = (lo + hi) / 2;
        self.build(node * 2, lo, mid, arr);
        self.build(node * 2 + 1, mid + 1, hi, arr);
        self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1];
    }

    fn apply(&mut self, node: usize, lo: i64, hi: i64) {
        self.tree[node] = (hi - lo + 1) - self.tree[node];
        self.lazy[node] = !self.lazy[node];
    }

    fn push(&mut self, node: usize, lo: i64, hi: i64) {
        if self.lazy[node] {
            let mid = (lo + hi) / 2;
            self.apply(node * 2, lo, mid);
            self.apply(node * 2 + 1, mid + 1, hi);
            self.lazy[node] = false;
        }
    }

    fn flip(&mut self, node: usize, lo: i64, hi: i64, ql: i64, qr: i64) {
        if ql > hi || qr < lo {
            return;
        }
        if ql <= lo && hi <= qr {
            self.apply(node, lo, hi);
            return;
        }
        self.push(node, lo, hi);
        let mid = (lo + hi) / 2;
        self.flip(node * 2, lo, mid, ql, qr);
        self.flip(node * 2 + 1, mid + 1, hi, ql, qr);
        self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1];
    }
}

impl Solution {
    pub fn handle_query(nums1: Vec<i32>, nums2: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i64> {
        let n = nums1.len();
        let mut seg = SegTree::new(&nums1);
        let mut total: i64 = nums2.iter().map(|&x| x as i64).sum();
        let mut answers: Vec<i64> = Vec::new();
        for q in &queries {
            let kind = q[0];
            if kind == 1 {
                seg.flip(1, 0, n as i64 - 1, q[1] as i64, q[2] as i64);
            } else if kind == 2 {
                total += q[1] as i64 * seg.tree[1];
            } else {
                answers.push(total);
            }
        }
        answers
    }
}
