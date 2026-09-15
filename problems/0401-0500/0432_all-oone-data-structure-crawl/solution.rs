use std::collections::{HashMap, HashSet};

// One bucket per count — the count plus the keys at it — threaded on a
// doubly-linked list kept in ascending count order. The list lives in a Vec
// arena (nodes linked by index, sentinels at slots 0 and 1, emptied slots
// recycled through a free list): every inc/dec walks its key exactly one
// bucket over, splicing the neighboring count in when it is missing and
// dropping buckets that empty out, so the extremes sit at the list's ends.
pub struct AllOne {
    nodes: Vec<Bucket>,
    free: Vec<usize>,
    key_bucket: HashMap<String, usize>,
}

struct Bucket {
    count: i64,
    keys: HashSet<String>,
    prev: usize,
    next: usize,
}

const HEAD: usize = 0; // sentinel below every real count
const TAIL: usize = 1; // sentinel above every real count

impl AllOne {
    pub fn new() -> Self {
        let sentinel = |other: usize| Bucket {
            count: 0,
            keys: HashSet::new(),
            prev: other,
            next: other,
        };
        AllOne {
            nodes: vec![sentinel(TAIL), sentinel(HEAD)],
            free: Vec::new(),
            key_bucket: HashMap::new(),
        }
    }

    fn insert_after(&mut self, anchor: usize, count: i64) -> usize {
        let next = self.nodes[anchor].next;
        let node = Bucket {
            count,
            keys: HashSet::new(),
            prev: anchor,
            next,
        };
        let slot = match self.free.pop() {
            Some(slot) => {
                self.nodes[slot] = node;
                slot
            }
            None => {
                self.nodes.push(node);
                self.nodes.len() - 1
            }
        };
        self.nodes[next].prev = slot;
        self.nodes[anchor].next = slot;
        slot
    }

    fn drop_bucket(&mut self, slot: usize) {
        let (prev, next) = (self.nodes[slot].prev, self.nodes[slot].next);
        self.nodes[prev].next = next;
        self.nodes[next].prev = prev;
        self.free.push(slot);
    }

    pub fn inc(&mut self, key: String) {
        let old = self.key_bucket.get(&key).copied();
        let (anchor, count) = match old {
            Some(slot) => (slot, self.nodes[slot].count + 1),
            None => (HEAD, 1),
        };
        // The needed count is exactly one past the anchor's, so only its
        // immediate successor can already hold it.
        let mut bucket = self.nodes[anchor].next;
        if self.nodes[bucket].count != count {
            bucket = self.insert_after(anchor, count);
        }
        self.nodes[bucket].keys.insert(key.clone());
        self.key_bucket.insert(key.clone(), bucket);
        if let Some(slot) = old {
            self.nodes[slot].keys.remove(&key);
            if self.nodes[slot].keys.is_empty() {
                self.drop_bucket(slot);
            }
        }
    }

    pub fn dec(&mut self, key: String) {
        let slot = self.key_bucket.remove(&key).unwrap(); // presence is guaranteed
        if self.nodes[slot].count > 1 {
            let count = self.nodes[slot].count - 1;
            let mut bucket = self.nodes[slot].prev;
            if self.nodes[bucket].count != count {
                bucket = self.insert_after(self.nodes[slot].prev, count);
            }
            self.nodes[bucket].keys.insert(key.clone());
            self.key_bucket.insert(key.clone(), bucket);
        }
        self.nodes[slot].keys.remove(&key);
        if self.nodes[slot].keys.is_empty() {
            self.drop_bucket(slot);
        }
    }

    fn pinned(&self, slot: usize) -> String {
        // Several keys may share the extreme count; the lexicographically
        // smallest of them is the pinned answer.
        self.nodes[slot].keys.iter().min().cloned().unwrap()
    }

    pub fn getMaxKey(&mut self) -> String {
        let bucket = self.nodes[TAIL].prev;
        if bucket == HEAD {
            String::new()
        } else {
            self.pinned(bucket)
        }
    }

    pub fn getMinKey(&mut self) -> String {
        let bucket = self.nodes[HEAD].next;
        if bucket == TAIL {
            String::new()
        } else {
            self.pinned(bucket)
        }
    }
}
