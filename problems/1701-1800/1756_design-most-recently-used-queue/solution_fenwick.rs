// The line rides a virtual tape: value v starts at tape position v and the
// j-th fetch re-appends its element at position n + j, so tape order is
// always line order. front marks the first live slot of the initial run — a
// sorted hole list remembers the vacated ones — while a Fenwick tree over
// the append stamps counts live elements per position, with a stamp-to-value
// map beside it.
pub struct MRUQueue {
    limit: i32,
    front: i32,
    holes: Vec<i32>,
    stamps: usize,
    step: usize,
    tree: Vec<i32>,
    vals: Vec<i32>,
    fetches: usize,
}

impl MRUQueue {
    pub fn new(n: i32) -> Self {
        let stamps = 10000usize;
        let mut step = 1usize;
        while step * 2 <= stamps {
            step *= 2;
        }
        MRUQueue {
            limit: n,
            front: 1,
            holes: Vec::new(),
            stamps,
            step,
            tree: vec![0; stamps + 1],
            vals: vec![0; stamps + 1],
            fetches: 0,
        }
    }

    pub fn fetch(&mut self, k: i32) -> i32 {
        let init_live = self.limit - self.front + 1 - self.holes.len() as i32;
        let value;
        if k <= init_live {
            let (mut lo, mut hi) = (self.front, self.limit);
            while lo < hi {
                let mid = lo + (hi - lo) / 2;
                if mid - self.front + 1 - self.holes_up_to(mid) as i32 >= k {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            value = lo;
            let idx = self.holes_up_to(value);
            self.holes.insert(idx, value);
            while self.holes.first() == Some(&self.front) {
                self.holes.remove(0);
                self.front += 1;
            }
        } else {
            let mut remaining = (k - init_live) as usize;
            let mut pos = 0usize;
            let mut hop = self.step;
            while hop > 0 {
                let next = pos + hop;
                if next <= self.stamps && (self.tree[next] as usize) < remaining {
                    pos = next;
                    remaining -= self.tree[next] as usize;
                }
                hop >>= 1;
            }
            let stamp = pos + 1;
            value = self.vals[stamp];
            self.add(stamp, -1);
        }
        self.fetches += 1;
        self.vals[self.fetches] = value;
        self.add(self.fetches, 1);
        value
    }

    fn holes_up_to(&self, bound: i32) -> usize {
        self.holes.partition_point(|&hole| hole <= bound)
    }

    fn add(&mut self, mut stamp: usize, delta: i32) {
        while stamp <= self.stamps {
            self.tree[stamp] += delta;
            stamp += stamp & stamp.wrapping_neg();
        }
    }
}
