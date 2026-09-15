use std::collections::HashMap;

// A plain key -> value hash map: no nodes, no per-insert maintenance. insert()
// stores the pair and stops -- the map carries no structure beyond the
// pairs themselves -- and sum() pays for that at query time,
// scanning every stored key and summing the values of those that start
// with the prefix.
pub struct MapSum {
    values: HashMap<String, i32>,
}

impl MapSum {
    pub fn new() -> Self {
        MapSum { values: HashMap::new() }
    }

    pub fn insert(&mut self, key: String, val: i32) {
        self.values.insert(key, val);
    }

    pub fn sum(&mut self, prefix: String) -> i32 {
        let mut total: i64 = 0;
        for (key, val) in &self.values {
            if key.starts_with(&prefix) {
                total += i64::from(*val);
            }
        }
        total as i32
    }
}
