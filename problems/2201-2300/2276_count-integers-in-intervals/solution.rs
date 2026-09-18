use std::collections::BTreeMap;

pub struct CountIntervals {
    // Disjoint stored ranges keyed by start; `covered` carries the union's
    // size so `size` is a plain read.
    intervals: BTreeMap<i32, i32>,
    covered: i64,
}

impl CountIntervals {
    pub fn new() -> Self {
        CountIntervals {
            intervals: BTreeMap::new(),
            covered: 0,
        }
    }

    pub fn add(&mut self, left: i32, right: i32) {
        let (mut new_left, mut new_right) = (left, right);
        // Merge every stored range that reaches the newcomer: with the
        // family disjoint, all of them start at or before `right`.
        loop {
            let candidate = self
                .intervals
                .range(..=right)
                .next_back()
                .map(|(&start, &end)| (start, end));
            match candidate {
                Some((start, end)) if end >= new_left => {
                    self.covered -= (end - start + 1) as i64;
                    new_left = new_left.min(start);
                    new_right = new_right.max(end);
                    self.intervals.remove(&start);
                }
                _ => break,
            }
        }
        self.covered += (new_right - new_left + 1) as i64;
        self.intervals.insert(new_left, new_right);
    }

    pub fn count(&mut self) -> i32 {
        self.covered as i32
    }
}
