use std::collections::{BTreeSet, HashMap};

// Hash map from value -> ordered set of indices, plus a values array.
// Deterministic variant: remove deletes the leftmost occurrence and moves
// the last element into the vacated slot; draw returns values[0].
pub struct RandomizedCollection {
    values: Vec<i32>,
    indices: HashMap<i32, BTreeSet<usize>>,
}

impl RandomizedCollection {
    pub fn new() -> Self {
        RandomizedCollection {
            values: Vec::new(),
            indices: HashMap::new(),
        }
    }

    pub fn insert(&mut self, val: i32) -> bool {
        let present = self.indices.contains_key(&val);
        self.values.push(val);
        let index = self.values.len() - 1; // new index is always the maximum
        self.indices.entry(val).or_default().insert(index);
        !present
    }

    pub fn remove(&mut self, val: i32) -> bool {
        let Some(positions) = self.indices.get_mut(&val) else {
            return false;
        };
        let index = *positions.first().unwrap(); // leftmost occurrence
        let last = self.values.len() - 1;
        if self.values[last] == val {
            // The moved element equals the removed one: a copy stays at
            // `index`, so only the last index leaves the set.
            positions.remove(&last);
        } else {
            let moved = self.values[last];
            self.values[index] = moved;
            let others = self.indices.get_mut(&moved).unwrap();
            others.remove(&last);
            others.insert(index);
            self.indices.get_mut(&val).unwrap().remove(&index);
        }
        self.values.pop();
        if self.indices.get(&val).is_none_or(|positions| positions.is_empty()) {
            self.indices.remove(&val);
        }
        true
    }

    pub fn getRandom(&mut self) -> i32 {
        self.values[0]
    }
}
