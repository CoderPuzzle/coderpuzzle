// A cursor over the runs of the encoding: the iterator never decodes
// anything — next(n) walks forward while the current run's remaining count
// is smaller than n, spending each exhausted run's remainder on n as it
// passes, then decrements the first run rich enough to supply the n-th
// element and returns that run's value.
pub struct RLEIterator {
    a: Vec<i32>,
    i: usize,
}

impl RLEIterator {
    pub fn new(encoding: Vec<i32>) -> Self {
        RLEIterator { a: encoding, i: 0 }
    }

    pub fn next(&mut self, mut n: i32) -> i32 {
        // Walk forward while the current run cannot supply the n-th element;
        // a run of length zero never stops this walk (0 is smaller than any n).
        while self.i < self.a.len() && self.a[self.i] < n {
            n -= self.a[self.i];
            self.i += 2;
        }
        if self.i >= self.a.len() {
            // The walk ran off the end: the n-th element does not exist, and
            // every remaining run was consumed along the way.
            return -1;
        }
        self.a[self.i] -= n;
        self.a[self.i + 1]
    }
}
