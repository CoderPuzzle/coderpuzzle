use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashSet};

pub struct ExamRoom {
    n: i32,
    occupied: Vec<i32>, // sorted seat numbers
    live: HashSet<(i32, i32)>,
    // Min-order over (-dist, spot, l, r), so popping yields the widest gap
    // and, on ties, the lower seat number.
    heap: BinaryHeap<Reverse<(i32, i32, i32, i32)>>,
}

impl ExamRoom {
    pub fn new(n: i32) -> Self {
        ExamRoom {
            n,
            occupied: Vec::new(),
            live: HashSet::new(),
            heap: BinaryHeap::new(),
        }
    }

    pub fn seat(&mut self) -> i32 {
        if self.occupied.is_empty() {
            self.occupied.push(0);
            self.add_segment(0, self.n);
            return 0;
        }
        while let Some(Reverse((_, spot, l, r))) = self.heap.pop() {
            if !self.live.contains(&(l, r)) {
                continue; // stale entry
            }
            self.live.remove(&(l, r));
            let index = self.occupied.partition_point(|&seat| seat < spot);
            self.occupied.insert(index, spot);
            self.add_segment(l, spot);
            self.add_segment(spot, r);
            return spot;
        }
        panic!("no seat available")
    }

    pub fn leave(&mut self, p: i32) {
        let index = self.occupied.partition_point(|&seat| seat < p);
        self.occupied.remove(index);
        let previous = if index > 0 { self.occupied[index - 1] } else { -1 };
        let next = if index < self.occupied.len() {
            self.occupied[index]
        } else {
            self.n
        };
        self.live.remove(&(previous, p));
        self.live.remove(&(p, next));
        if !self.occupied.is_empty() && next - previous >= 2 {
            self.add_segment(previous, next);
        }
    }

    // A segment spans adjacent occupied seats l and r (sentinels -1 and n
    // at the edges); candidate seat and distance are pure functions of the
    // pair, so stale heap entries are skipped via the live set.
    fn add_segment(&mut self, l: i32, r: i32) {
        if r - l < 2 {
            return; // no free seat strictly between
        }
        let (dist, spot) = if l == -1 {
            (r, 0)
        } else if r == self.n {
            (self.n - 1 - l, self.n - 1)
        } else {
            ((r - l) / 2, (l + r) / 2)
        };
        self.live.insert((l, r));
        self.heap.push(Reverse((-dist, spot, l, r)));
    }
}
