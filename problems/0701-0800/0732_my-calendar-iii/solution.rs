use std::collections::BTreeMap;

pub struct MyCalendarThree {
    // Per-instant change in the number of live intervals: +1 where one
    // opens, -1 where one closes, held in time order.
    delta: BTreeMap<i32, i32>,
}

impl MyCalendarThree {
    pub fn new() -> Self {
        MyCalendarThree { delta: BTreeMap::new() }
    }

    pub fn book(&mut self, start: i32, end: i32) -> i32 {
        *self.delta.entry(start).or_insert(0) += 1;
        *self.delta.entry(end).or_insert(0) -= 1;
        let mut best = 0;
        let mut active = 0;
        // Sweep boundaries in time order; the running sum is the number of
        // events active at that moment, so its peak is the deepest overlap
        // seen. Changes at one instant merge, so an interval closing where
        // another opens is never counted twice.
        for &change in self.delta.values() {
            active += change;
            if active > best {
                best = active;
            }
        }
        best
    }
}
