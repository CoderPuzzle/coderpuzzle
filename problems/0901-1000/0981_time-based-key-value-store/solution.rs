use std::collections::HashMap;

pub struct TimeMap {
    values: HashMap<String, Vec<String>>,
    stamps: HashMap<String, Vec<i32>>,
}

impl TimeMap {
    pub fn new() -> Self {
        TimeMap {
            values: HashMap::new(),
            stamps: HashMap::new(),
        }
    }

    pub fn set(&mut self, key: String, value: String, timestamp: i32) {
        self.values.entry(key.clone()).or_default().push(value);
        self.stamps.entry(key).or_default().push(timestamp);
    }

    pub fn get(&mut self, key: String, timestamp: i32) -> String {
        let stamps = match self.stamps.get(&key) {
            None => return String::new(),
            Some(stamps) => stamps,
        };
        let index = stamps.partition_point(|&stamp| stamp <= timestamp);
        if index == 0 {
            return String::new();
        }
        self.values.get(&key).unwrap()[index - 1].clone()
    }
}
