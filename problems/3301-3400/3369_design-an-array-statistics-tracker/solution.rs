use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap, VecDeque};

// Every statistic lives in its own incrementally maintained structure: a
// queue holds arrival order, a running sum serves the mean, two heaps
// split the live values into a lower and an upper half so the median is
// always at a top, and a (count, value) heap answers the mode. Removals
// are FIFO and arbitrary for a heap, so an erased value is only marked in
// a delayed counter and discarded when it surfaces at a top; rebalancing
// counts only live entries, and the mode heap's stale entries are skipped
// lazily the same way. Each call costs O(log n) amortized. The running
// sum reaches 1e5 * 1e9 = 1e14, so it is held in an i64.
pub struct StatisticsTracker {
    queue: VecDeque<i32>,
    total: i64,
    // small is a raw max-heap over the lower half; large is a min-heap
    // via the Reverse wrapper.
    small: BinaryHeap<i32>,
    large: BinaryHeap<Reverse<i32>>,
    small_size: usize, // live sizes, ghosts excluded
    large_size: usize,
    delayed: HashMap<i32, i32>,
    counts: HashMap<i32, i32>,
    // Entries (count, Reverse(value)): the max-heap order puts the
    // highest count first and breaks ties toward the smallest value.
    mode_heap: BinaryHeap<(i32, Reverse<i32>)>,
}

impl StatisticsTracker {
    pub fn new() -> Self {
        StatisticsTracker {
            queue: VecDeque::new(),
            total: 0,
            small: BinaryHeap::new(),
            large: BinaryHeap::new(),
            small_size: 0,
            large_size: 0,
            delayed: HashMap::new(),
            counts: HashMap::new(),
            mode_heap: BinaryHeap::new(),
        }
    }

    // Discard ghosts queued for deletion while they sit at the top.
    fn prune_small(&mut self) {
        while let Some(&value) = self.small.peek() {
            let pending = self.delayed.entry(value).or_insert(0);
            if *pending > 0 {
                *pending -= 1;
                self.small.pop();
            } else {
                break;
            }
        }
    }

    fn prune_large(&mut self) {
        while let Some(&Reverse(value)) = self.large.peek() {
            let pending = self.delayed.entry(value).or_insert(0);
            if *pending > 0 {
                *pending -= 1;
                self.large.pop();
            } else {
                break;
            }
        }
    }

    // Keep ceil(n/2) live values in small; the median read sits at a top
    // after this. Moves only touch pruned, live tops.
    fn rebalance(&mut self) {
        if self.small_size > self.large_size + 1 {
            self.large.push(Reverse(self.small.pop().expect("nonempty")));
            self.small_size -= 1;
            self.large_size += 1;
            self.prune_small();
        } else if self.small_size < self.large_size {
            self.small.push(self.large.pop().expect("nonempty").0);
            self.small_size += 1;
            self.large_size -= 1;
            self.prune_large();
        }
    }

    pub fn addNumber(&mut self, number: i32) {
        self.queue.push_back(number);
        self.total += number as i64;
        *self.counts.entry(number).or_insert(0) += 1;
        // An entry exists for every count level each value reaches, so
        // the current count of any live value is always in the heap.
        let count = self.counts[&number];
        self.mode_heap.push((count, Reverse(number)));
        if self.small.is_empty() || number <= *self.small.peek().expect("nonempty") {
            self.small.push(number);
            self.small_size += 1;
        } else {
            self.large.push(Reverse(number));
            self.large_size += 1;
        }
        self.rebalance();
    }

    pub fn removeFirstAddedNumber(&mut self) {
        let number = self.queue.pop_front().expect("nonempty");
        self.total -= number as i64;
        *self.counts.entry(number).or_insert(0) -= 1;
        // The ghost is charged to the half its value belongs to; when a
        // matching copy surfaces at that top it is discarded, which keeps
        // fungible duplicates consistent.
        *self.delayed.entry(number).or_insert(0) += 1;
        if number <= *self.small.peek().expect("nonempty") {
            self.small_size -= 1;
            if number == *self.small.peek().expect("nonempty") {
                self.prune_small();
            }
        } else if number == self.large.peek().expect("nonempty").0 {
            self.large_size -= 1;
            self.prune_large();
        } else {
            self.large_size -= 1;
        }
        self.rebalance();
    }

    pub fn getMean(&mut self) -> i32 {
        (self.total / self.queue.len() as i64) as i32
    }

    pub fn getMedian(&mut self) -> i32 {
        self.prune_small();
        self.prune_large();
        if self.small_size > self.large_size {
            return *self.small.peek().expect("nonempty");
        }
        // Even count: the larger of the two middles is the upper half's
        // minimum.
        self.large.peek().expect("nonempty").0
    }

    pub fn getMode(&mut self) -> i32 {
        while let Some(&(count, Reverse(value))) = self.mode_heap.peek() {
            if self.counts[&value] == count {
                return value;
            }
            self.mode_heap.pop();
        }
        panic!("empty tracker");
    }
}
