use std::collections::{BTreeMap, HashMap};

// Frequency cache keyed like the bucket-list solution: every entry
// carries its frequency and a last-use tick, and `order` keeps
// (frequency, tick) -> key sorted. The first entry of `order` is the
// least frequently used entry — and among equals, the least recently
// used — so eviction is a lookup at the front, exactly what the
// doubly-linked bucket list computes.
pub struct LFUCache {
    capacity: usize,
    // key -> (value, frequency, tick of last use)
    nodes: HashMap<i32, (i32, i64, u64)>,
    order: BTreeMap<(i64, u64), i32>,
    clock: u64,
}

impl LFUCache {
    pub fn new(capacity: i32) -> Self {
        LFUCache {
            capacity: capacity as usize,
            nodes: HashMap::new(),
            order: BTreeMap::new(),
            clock: 0,
        }
    }

    // A use moves the entry one frequency up at a fresh tick.
    fn bump(&mut self, key: i32) {
        let (_, frequency, tick) = self.nodes[&key];
        let entry = self.nodes.get_mut(&key).unwrap();
        self.clock += 1;
        entry.1 += 1;
        entry.2 = self.clock;
        self.order.remove(&(frequency, tick));
        self.order.insert((entry.1, entry.2), key);
    }

    pub fn get(&mut self, key: i32) -> i32 {
        if !self.nodes.contains_key(&key) {
            return -1;
        }
        self.bump(key);
        self.nodes[&key].0
    }

    pub fn put(&mut self, key: i32, value: i32) {
        if self.nodes.contains_key(&key) {
            self.nodes.get_mut(&key).unwrap().0 = value;
            self.bump(key);
            return;
        }
        if self.nodes.len() == self.capacity {
            // Evict the front of `order`: least frequent, least recent.
            let victim = self.order.iter().next().map(|(_, &k)| k).unwrap();
            if let Some((_, frequency, tick)) = self.nodes.remove(&victim) {
                self.order.remove(&(frequency, tick));
            }
        }
        self.clock += 1;
        self.nodes.insert(key, (value, 1, self.clock));
        self.order.insert((1, self.clock), key);
    }
}
