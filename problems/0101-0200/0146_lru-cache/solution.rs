use std::collections::HashMap;

// Slots live in one arena and never move, so a key's node is reached in O(1)
// through the map and unlinked in O(1) through its neighbours. Sentinels at
// HEAD and TAIL remove every boundary case: the list is never empty, so no
// branch has to ask whether a neighbour exists.
const HEAD: usize = 0;
const TAIL: usize = 1;

struct Slot {
    key: i32,
    value: i32,
    prev: usize,
    next: usize,
}

pub struct LRUCache {
    capacity: usize,
    slots: Vec<Slot>,
    index: HashMap<i32, usize>,
    free: Vec<usize>,
}

impl LRUCache {
    pub fn new(capacity: i32) -> Self {
        let sentinel = |prev, next| Slot {
            key: 0,
            value: 0,
            prev,
            next,
        };
        LRUCache {
            capacity: capacity as usize,
            slots: vec![sentinel(TAIL, TAIL), sentinel(HEAD, HEAD)],
            index: HashMap::new(),
            free: Vec::new(),
        }
    }

    fn unlink(&mut self, slot: usize) {
        let (prev, next) = (self.slots[slot].prev, self.slots[slot].next);
        self.slots[prev].next = next;
        self.slots[next].prev = prev;
    }

    fn push_front(&mut self, slot: usize) {
        let first = self.slots[HEAD].next;
        self.slots[slot].prev = HEAD;
        self.slots[slot].next = first;
        self.slots[first].prev = slot;
        self.slots[HEAD].next = slot;
    }

    pub fn get(&mut self, key: i32) -> i32 {
        match self.index.get(&key).copied() {
            Some(slot) => {
                self.unlink(slot);
                self.push_front(slot);
                self.slots[slot].value
            }
            None => -1,
        }
    }

    pub fn put(&mut self, key: i32, value: i32) {
        if let Some(slot) = self.index.get(&key).copied() {
            self.slots[slot].value = value;
            self.unlink(slot);
            self.push_front(slot);
            return;
        }
        if self.index.len() == self.capacity {
            // The tail's neighbour is the least recently used entry; its slot
            // is recycled rather than grown, so the arena stays at capacity.
            let victim = self.slots[TAIL].prev;
            self.unlink(victim);
            let evicted = self.slots[victim].key;
            self.index.remove(&evicted);
            self.free.push(victim);
        }
        let slot = match self.free.pop() {
            Some(reused) => {
                self.slots[reused].key = key;
                self.slots[reused].value = value;
                reused
            }
            None => {
                self.slots.push(Slot {
                    key,
                    value,
                    prev: HEAD,
                    next: HEAD,
                });
                self.slots.len() - 1
            }
        };
        self.index.insert(key, slot);
        self.push_front(slot);
    }
}
