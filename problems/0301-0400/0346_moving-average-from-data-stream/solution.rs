// A fixed ring buffer plus a running sum: next writes the incoming value
// over the window's oldest slot, folds the evicted value out of the sum
// and the new one in, and returns sum / count — the sum stays an exact
// integer and only the final step is a division.
pub struct MovingAverage {
    window: Vec<i64>,
    total: i64,
    head: usize,
    count: usize,
    capacity: usize,
}

impl MovingAverage {
    pub fn new(size: i32) -> Self {
        MovingAverage {
            window: vec![0; size as usize],
            capacity: size as usize,
            total: 0,
            head: 0,
            count: 0,
        }
    }

    pub fn next(&mut self, val: i32) -> f64 {
        // The head slot holds the oldest value once the window is full;
        // before that the window is still filling and nothing evicts.
        if self.count < self.capacity {
            self.count += 1;
        } else {
            self.total -= self.window[self.head];
        }
        self.window[self.head] = val as i64;
        self.total += val as i64;
        self.head = (self.head + 1) % self.capacity;
        self.total as f64 / self.count as f64
    }
}
