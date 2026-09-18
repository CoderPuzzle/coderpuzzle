use std::collections::HashMap;

pub struct UndergroundSystem {
    checkins: HashMap<i32, (String, i32)>,
    totals: HashMap<(String, String), (i64, i64)>,
}

impl UndergroundSystem {
    pub fn new() -> Self {
        UndergroundSystem {
            checkins: HashMap::new(),
            totals: HashMap::new(),
        }
    }

    pub fn checkIn(&mut self, id: i32, stop: String, t: i32) {
        self.checkins.insert(id, (stop, t));
    }

    pub fn checkOut(&mut self, id: i32, stop: String, t: i32) {
        let (start, started) = self.checkins.remove(&id).unwrap();
        let bucket = self.totals.entry((start, stop)).or_insert((0, 0));
        bucket.0 += (t - started) as i64;
        bucket.1 += 1;
    }

    pub fn getAverageTime(&mut self, fromStop: String, toStop: String) -> f64 {
        let &(total, count) = self.totals.get(&(fromStop, toStop)).unwrap();
        total as f64 / count as f64
    }
}
