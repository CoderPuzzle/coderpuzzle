use std::collections::VecDeque;

// Two Fenwick trees indexed by value — one of counts, one of sums — hold
// the current m-wide window, alongside the window itself in arrival
// order. addElement inserts the new value and, once the window is full,
// removes the value that just slid out; both are O(log V). A query
// descends the count tree twice to read off the combined value of the j
// smallest elements for j = k and j = m - k, so the trimmed middle sum
// is S(m-k) - S(k) and the answer is that sum floor-divided by m - 2k,
// or -1 while the stream is still shorter than m.
pub struct MKAverage {
    m: usize,
    k: usize,
    counts: Vec<i32>,
    sums: Vec<i64>,
    window: VecDeque<i32>,
}

const LIMIT: usize = 100000;

impl MKAverage {
    pub fn new(m: i32, k: i32) -> Self {
        MKAverage {
            m: m as usize,
            k: k as usize,
            counts: vec![0; LIMIT + 1],
            sums: vec![0; LIMIT + 1],
            window: VecDeque::new(),
        }
    }

    fn update(&mut self, value: usize, delta: i32) {
        // Counts and sums move together so a descent can pair them; the sum
        // side always charges the element's own value, not the bucket index.
        let element = value;
        let mut value = value;
        while value <= LIMIT {
            self.counts[value] += delta;
            self.sums[value] += element as i64 * delta as i64;
            value += value & value.wrapping_neg();
        }
    }

    pub fn addElement(&mut self, num: i32) {
        self.window.push_back(num);
        self.update(num as usize, 1);
        if self.window.len() > self.m {
            // The window holds exactly the last m elements: evict the oldest.
            let old = self.window.pop_front().expect("window is overfull");
            self.update(old as usize, -1);
        }
    }

    fn smallest_sum(&self, j: usize) -> i64 {
        // Descend the count tree to the value holding the j-th smallest
        // element, accumulating the sums of fully covered buckets.
        let mut index = 0usize;
        let mut taken = 0i64;
        let mut total = 0i64;
        let mut step = 1usize << 16; // largest power of two <= LIMIT
        while step > 0 {
            let next = index + step;
            if next <= LIMIT && taken + (self.counts[next] as i64) < j as i64 {
                index = next;
                taken += self.counts[next] as i64;
                total += self.sums[next];
            }
            step >>= 1;
        }
        total + (index as i64 + 1) * (j as i64 - taken)
    }

    pub fn calculateMKAverage(&mut self) -> i32 {
        if self.window.len() < self.m {
            return -1;
        }
        let middle = self.smallest_sum(self.m - self.k) - self.smallest_sum(self.k);
        (middle / (self.m as i64 - 2 * self.k as i64)) as i32
    }
}
