use std::collections::HashMap;

pub struct FrequencyTracker {
    count_of: HashMap<i32, i32>,
    numbers_at: HashMap<i32, i32>,
}

impl FrequencyTracker {
    pub fn new() -> Self {
        FrequencyTracker {
            count_of: HashMap::new(),
            numbers_at: HashMap::new(),
        }
    }

    pub fn add(&mut self, number: i32) {
        let count = self.count_of.get(&number).copied().unwrap_or(0);
        self.count_of.insert(number, count + 1);
        if count > 0 {
            *self.numbers_at.entry(count).or_insert(0) -= 1;
        }
        *self.numbers_at.entry(count + 1).or_insert(0) += 1;
    }

    pub fn deleteOne(&mut self, number: i32) {
        let count = match self.count_of.get(&number) {
            Some(&c) if c > 0 => c,
            _ => return, // The structure may not contain it; delete nothing.
        };
        self.count_of.insert(number, count - 1);
        *self.numbers_at.entry(count).or_insert(0) -= 1;
        if count > 1 {
            *self.numbers_at.entry(count - 1).or_insert(0) += 1;
        }
    }

    pub fn hasFrequency(&mut self, frequency: i32) -> bool {
        self.numbers_at.get(&frequency).copied().unwrap_or(0) > 0
    }
}
