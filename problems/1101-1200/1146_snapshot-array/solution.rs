use std::collections::HashMap;

pub struct SnapshotArray {
    current: i32, // version id the next commit() will return
    history: HashMap<i32, Vec<(i32, i32)>>,
}

impl SnapshotArray {
    pub fn new(length: i32) -> Self {
        SnapshotArray {
            current: 0,
            history: HashMap::new(),
        }
    }

    pub fn set(&mut self, index: i32, val: i32) {
        let current = self.current;
        let entries = self.history.entry(index).or_default();
        if entries.last().map_or(false, |last| last.0 == current) {
            if let Some(last) = entries.last_mut() {
                last.1 = val; // a second write in the same version
            }
        } else {
            entries.push((current, val));
        }
    }

    pub fn snap(&mut self) -> i32 {
        let id = self.current;
        self.current += 1;
        id
    }

    pub fn get(&mut self, index: i32, commit_id: i32) -> i32 {
        let entries = match self.history.get(&index) {
            None => return 0, // never written
            Some(entries) => entries,
        };
        let mut low = 0;
        let mut high = entries.len();
        while low < high {
            // rightmost entry at or before commit_id
            let mid = (low + high) / 2;
            if entries[mid].0 <= commit_id {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        if low == 0 {
            0
        } else {
            entries[low - 1].1
        }
    }
}
