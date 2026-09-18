pub struct BookMyShow {
    n: usize,
    m: i32,
    remaining: Vec<i32>, // free seats left per row
    sums: Vec<i64>,
    maxs: Vec<i32>,
}

impl BookMyShow {
    pub fn new(n: i32, m: i32) -> Self {
        let n = n as usize;
        let mut seating = BookMyShow {
            n,
            m,
            remaining: vec![m; n],
            sums: vec![0; 4 * n],
            maxs: vec![0; 4 * n],
        };
        if n > 0 {
            seating.build(1, 0, n - 1);
        }
        seating
    }

    fn build(&mut self, node: usize, lo: usize, hi: usize) {
        if lo == hi {
            self.sums[node] = self.remaining[lo] as i64;
            self.maxs[node] = self.remaining[lo];
            return;
        }
        let mid = (lo + hi) / 2;
        self.build(2 * node, lo, mid);
        self.build(2 * node + 1, mid + 1, hi);
        self.pull(node);
    }

    fn pull(&mut self, node: usize) {
        self.sums[node] = self.sums[2 * node] + self.sums[2 * node + 1];
        self.maxs[node] = self.maxs[2 * node].max(self.maxs[2 * node + 1]);
    }

    fn update(&mut self, node: usize, lo: usize, hi: usize, index: usize, value: i32) {
        if lo == hi {
            self.remaining[index] = value;
            self.sums[node] = value as i64;
            self.maxs[node] = value;
            return;
        }
        let mid = (lo + hi) / 2;
        if index <= mid {
            self.update(2 * node, lo, mid, index, value);
        } else {
            self.update(2 * node + 1, mid + 1, hi, index, value);
        }
        self.pull(node);
    }

    fn rangeSum(&self, node: usize, lo: usize, hi: usize, left: usize, right: usize) -> i64 {
        if right < lo || hi < left {
            return 0;
        }
        if left <= lo && hi <= right {
            return self.sums[node];
        }
        let mid = (lo + hi) / 2;
        self.rangeSum(2 * node, lo, mid, left, right) + self.rangeSum(2 * node + 1, mid + 1, hi, left, right)
    }

    // Smallest index in [left, right] with remaining >= k, or None.
    fn firstAtLeast(&self, node: usize, lo: usize, hi: usize, left: usize, right: usize, k: i32) -> Option<usize> {
        if right < lo || hi < left || self.maxs[node] < k {
            return None;
        }
        if lo == hi {
            return Some(lo);
        }
        let mid = (lo + hi) / 2;
        if let Some(found) = self.firstAtLeast(2 * node, lo, mid, left, right, k) {
            return Some(found);
        }
        self.firstAtLeast(2 * node + 1, mid + 1, hi, left, right, k)
    }

    pub fn gather(&mut self, k: i32, lastRow: i32) -> Vec<i32> {
        let last = self.n - 1;
        match self.firstAtLeast(1, 0, last, 0, lastRow as usize, k) {
            None => Vec::new(),
            Some(row) => {
                let column = self.m - self.remaining[row];
                self.update(1, 0, last, row, self.remaining[row] - k);
                vec![row as i32, column]
            }
        }
    }

    pub fn scatter(&mut self, mut k: i32, lastRow: i32) -> bool {
        let last = self.n - 1;
        let lastRow = lastRow as usize;
        if self.rangeSum(1, 0, last, 0, lastRow) < k as i64 {
            return false;
        }
        let mut row = 0;
        while k > 0 {
            row = self.firstAtLeast(1, 0, last, row, lastRow, 1).unwrap();
            let take = self.remaining[row].min(k);
            k -= take;
            self.update(1, 0, last, row, self.remaining[row] - take);
            row += 1;
        }
        true
    }
}
