use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

pub struct NumberContainers {
    // index -> number currently filling it
    slots: HashMap<i32, i32>,
    // number -> every index ever filled with it; stale entries are
    // discarded only when find() reaches them
    candidates: HashMap<i32, BinaryHeap<Reverse<i32>>>,
}

impl NumberContainers {
    pub fn new() -> Self {
        NumberContainers {
            slots: HashMap::new(),
            candidates: HashMap::new(),
        }
    }

    pub fn change(&mut self, index: i32, number: i32) {
        if self.slots.get(&index) == Some(&number) {
            return;
        }
        self.slots.insert(index, number);
        self.candidates.entry(number).or_default().push(Reverse(index));
    }

    pub fn find(&mut self, number: i32) -> i32 {
        let heap = match self.candidates.get_mut(&number) {
            None => return -1,
            Some(heap) => heap,
        };
        // the top is the answer unless that index has since been refilled
        while let Some(&Reverse(top)) = heap.peek() {
            if self.slots.get(&top) == Some(&number) {
                return top;
            }
            heap.pop();
        }
        -1
    }
}
