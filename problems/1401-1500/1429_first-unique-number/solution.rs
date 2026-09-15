use std::collections::{HashMap, VecDeque};

pub struct FirstUnique {
    counts: HashMap<i64, i32>,
    queue: VecDeque<i64>,
}

impl FirstUnique {
    pub fn new(nums: Vec<i64>) -> Self {
        let mut design = FirstUnique {
            counts: HashMap::new(),
            queue: VecDeque::new(),
        };
        for value in nums {
            design.add(value);
        }
        design
    }

    pub fn show_first_unique(&mut self) -> i64 {
        while let Some(&front) = self.queue.front() {
            if self.counts[&front] > 1 {
                self.queue.pop_front();
            } else {
                break;
            }
        }
        match self.queue.front() {
            Some(&value) => value,
            None => -1,
        }
    }

    pub fn add(&mut self, value: i64) {
        *self.counts.entry(value).or_insert(0) += 1;
        self.queue.push_back(value);
    }
}
