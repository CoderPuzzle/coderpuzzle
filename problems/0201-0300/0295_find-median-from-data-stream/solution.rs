use std::cmp::Reverse;
use std::collections::BinaryHeap;

pub struct MedianFinder {
    low: BinaryHeap<Reverse<i64>>,  // smaller half, min-heap of negated values
    high: BinaryHeap<Reverse<i64>>, // larger half, min-heap
}

impl MedianFinder {
    pub fn new() -> Self {
        MedianFinder {
            low: BinaryHeap::new(),
            high: BinaryHeap::new(),
        }
    }

    pub fn addNum(&mut self, num: i32) {
        self.low.push(Reverse(-(num as i64)));
        // Route through both heaps: the largest of the small half crosses
        // over, then rebalance if the large half grew too big.
        let crossed = -self.low.pop().unwrap().0;
        self.high.push(Reverse(crossed));
        if self.high.len() > self.low.len() {
            let returned = -self.high.pop().unwrap().0;
            self.low.push(Reverse(returned));
        }
    }

    pub fn findMedian(&mut self) -> f64 {
        let low_top = -self.low.peek().unwrap().0 as f64;
        if self.low.len() > self.high.len() {
            return low_top;
        }
        let high_top = self.high.peek().unwrap().0 as f64;
        (low_top + high_top) / 2.0
    }
}
