use std::cmp::Ordering;
use std::collections::BinaryHeap;

#[derive(Eq, PartialEq)]
struct Location {
    name: String,
    score: i32,
}

#[derive(Eq, PartialEq)]
struct Best(Location);

impl Ord for Best {
    fn cmp(&self, other: &Self) -> Ordering {
        self.0
            .score
            .cmp(&other.0.score)
            .then_with(|| other.0.name.cmp(&self.0.name))
    }
}

impl PartialOrd for Best {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

#[derive(Eq, PartialEq)]
struct Worst(Location);

impl Ord for Worst {
    fn cmp(&self, other: &Self) -> Ordering {
        other
            .0
            .score
            .cmp(&self.0.score)
            .then_with(|| self.0.name.cmp(&other.0.name))
    }
}

impl PartialOrd for Worst {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

pub struct SORTracker {
    prefix: BinaryHeap<Worst>,
    remaining: BinaryHeap<Best>,
}

impl SORTracker {
    pub fn new() -> Self {
        Self {
            prefix: BinaryHeap::new(),
            remaining: BinaryHeap::new(),
        }
    }

    pub fn add(&mut self, name: String, score: i32) {
        self.prefix.push(Worst(Location { name, score }));
        let Worst(location) = self.prefix.pop().unwrap();
        self.remaining.push(Best(location));
    }

    pub fn get(&mut self) -> String {
        let Best(location) = self.remaining.pop().unwrap();
        self.prefix.push(Worst(location));
        self.prefix.peek().unwrap().0.name.clone()
    }
}
