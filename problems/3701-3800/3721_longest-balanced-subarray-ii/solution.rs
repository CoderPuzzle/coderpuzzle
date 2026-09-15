use std::collections::HashMap;

struct SegTree {
    n: usize,
    mn: Vec<i32>,
    mx: Vec<i32>,
    lazy: Vec<i32>,
}

impl SegTree {
    fn new(values: &[i32]) -> Self {
        let n = values.len();
        let mut t = SegTree {
            n,
            mn: vec![0; 4 * n],
            mx: vec![0; 4 * n],
            lazy: vec![0; 4 * n],
        };
        t.build(1, 0, n - 1, values);
        t
    }

    fn build(&mut self, node: usize, nl: usize, nr: usize, values: &[i32]) {
        if nl == nr {
            self.mn[node] = values[nl];
            self.mx[node] = values[nl];
            return;
        }
        let mid = (nl + nr) / 2;
        self.build(node * 2, nl, mid, values);
        self.build(node * 2 + 1, mid + 1, nr, values);
        self.mn[node] = self.mn[node * 2].min(self.mn[node * 2 + 1]);
        self.mx[node] = self.mx[node * 2].max(self.mx[node * 2 + 1]);
    }

    fn push(&mut self, node: usize) {
        let z = self.lazy[node];
        if z != 0 {
            for &c in &[node * 2, node * 2 + 1] {
                self.mn[c] += z;
                self.mx[c] += z;
                self.lazy[c] += z;
            }
            self.lazy[node] = 0;
        }
    }

    fn add(&mut self, node: usize, nl: usize, nr: usize, ql: usize, qr: usize, delta: i32) {
        if ql <= nl && nr <= qr {
            self.mn[node] += delta;
            self.mx[node] += delta;
            self.lazy[node] += delta;
            return;
        }
        self.push(node);
        let mid = (nl + nr) / 2;
        if ql <= mid {
            self.add(node * 2, nl, mid, ql, qr, delta);
        }
        if qr > mid {
            self.add(node * 2 + 1, mid + 1, nr, ql, qr, delta);
        }
        self.mn[node] = self.mn[node * 2].min(self.mn[node * 2 + 1]);
        self.mx[node] = self.mx[node * 2].max(self.mx[node * 2 + 1]);
    }

    fn rightmost_zero(&mut self, ql: usize, qr: usize) -> i64 {
        self.rightmost(1, 0, self.n - 1, ql, qr)
    }

    fn rightmost(&mut self, node: usize, nl: usize, nr: usize, ql: usize, qr: usize) -> i64 {
        if qr < nl || nr < ql {
            return -1;
        }
        if ql <= nl && nr <= qr {
            if self.mn[node] > 0 || self.mx[node] < 0 {
                return -1;
            }
            if nl == nr {
                return nl as i64;
            }
            self.push(node);
            let mid = (nl + nr) / 2;
            let res = self.rightmost(node * 2 + 1, mid + 1, nr, ql, qr);
            if res != -1 {
                return res;
            }
            return self.rightmost(node * 2, nl, mid, ql, qr);
        }
        self.push(node);
        let mid = (nl + nr) / 2;
        let res = self.rightmost(node * 2 + 1, mid + 1, nr, ql, qr);
        if res != -1 {
            return res;
        }
        self.rightmost(node * 2, nl, mid, ql, qr)
    }
}

impl Solution {
    pub fn longest_balanced(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // first occurrence of each value (seeds balance(0, r)) and the next
        // occurrence of each position (tells where a value stops mattering).
        let mut first: HashMap<i32, usize> = HashMap::new();
        let mut nxt = vec![n; n];
        let mut last: HashMap<i32, usize> = HashMap::new();
        for i in (0..n).rev() {
            let v = nums[i];
            if let Some(&p) = last.get(&v) {
                nxt[i] = p;
            }
            last.insert(v, i);
        }
        for (i, &v) in nums.iter().enumerate() {
            first.entry(v).or_insert(i);
        }
        // Seed balance(0, r): each value contributes its sign to every right
        // end at or after its first occurrence, via O(log n) range adds.
        let mut tree = SegTree::new(&vec![0; n]);
        for (&v, &p) in first.iter() {
            let s = if v & 1 == 1 { 1 } else { -1 };
            tree.add(1, 0, n - 1, p, n - 1, s);
        }
        let mut best = 0i32;
        for l in 0..n {
            let r = tree.rightmost_zero(l, n - 1);
            if r != -1 {
                let cand = (r as usize - l + 1) as i32;
                if cand > best {
                    best = cand;
                }
            }
            let v = nums[l];
            let s = if v & 1 == 1 { 1 } else { -1 };
            if nxt[l] > l {
                tree.add(1, 0, n - 1, l, nxt[l] - 1, -s);
            }
        }
        best
    }
}
