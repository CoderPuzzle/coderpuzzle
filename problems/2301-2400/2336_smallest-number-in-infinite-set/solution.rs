use std::collections::HashSet;

pub struct SmallestInfiniteSet {
    // Everything below next_new has been popped at least once; a
    // removed value is present again exactly when it sits in this set.
    // Values >= next_new have never been touched.
    next_new: i32,
    added_back: HashSet<i32>,
}

impl SmallestInfiniteSet {
    pub fn new() -> Self {
        SmallestInfiniteSet {
            next_new: 1,
            added_back: HashSet::new(),
        }
    }

    pub fn popSmallest(&mut self) -> i32 {
        if !self.added_back.is_empty() {
            let value = *self.added_back.iter().min().unwrap();
            self.added_back.remove(&value);
            return value;
        }
        let value = self.next_new;
        self.next_new += 1;
        value
    }

    pub fn addBack(&mut self, num: i32) {
        // Only values already popped can be added back.
        if num < self.next_new {
            self.added_back.insert(num);
        }
    }
}
