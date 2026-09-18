use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

// One logged observation; derived ordering compares price first.
#[derive(PartialEq, Eq, PartialOrd, Ord)]
struct Entry {
    price: i32,
    timestamp: i32,
}

pub struct StockPrice {
    // timestamp -> currently valid price; a correction is an overwrite.
    price_at: HashMap<i32, i32>,
    // Twin lazy heaps: entries are pushed on record and never removed;
    // stale ones are discarded only at the top.
    max_heap: BinaryHeap<Entry>,
    min_heap: BinaryHeap<Reverse<Entry>>,
    // The greatest moment ever recorded.
    latest_timestamp: i32,
}

impl StockPrice {
    pub fn new() -> Self {
        StockPrice {
            price_at: HashMap::new(),
            max_heap: BinaryHeap::new(),
            min_heap: BinaryHeap::new(),
            latest_timestamp: 0,
        }
    }

    pub fn update(&mut self, timestamp: i32, price: i32) {
        self.price_at.insert(timestamp, price);
        if timestamp > self.latest_timestamp {
            self.latest_timestamp = timestamp;
        }
        self.max_heap.push(Entry { price, timestamp });
        self.min_heap.push(Reverse(Entry { price, timestamp }));
    }

    pub fn current(&mut self) -> i32 {
        self.price_at[&self.latest_timestamp]
    }

    pub fn maximum(&mut self) -> i32 {
        // An entry is garbage exactly when its timestamp now maps to a
        // different price; pop those, then the top is the true highest.
        while let Some(top) = self.max_heap.peek() {
            if self.price_at.get(&top.timestamp) == Some(&top.price) {
                return top.price;
            }
            self.max_heap.pop();
        }
        unreachable!("highest is only called after a record")
    }

    pub fn minimum(&mut self) -> i32 {
        // Same lazy cleanup on the min side.
        while let Some(Reverse(top)) = self.min_heap.peek() {
            if self.price_at.get(&top.timestamp) == Some(&top.price) {
                return top.price;
            }
            self.min_heap.pop();
        }
        unreachable!("lowest is only called after a record")
    }
}
