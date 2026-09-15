use std::collections::HashMap;

pub struct DetectSquares {
    frequencies: HashMap<i32, i32>,
}

impl DetectSquares {
    pub fn new() -> Self {
        DetectSquares {
            frequencies: HashMap::new(),
        }
    }

    pub fn add(&mut self, point: Vec<i32>) {
        *self.frequencies.entry(Self::encode(point[0], point[1])).or_insert(0) += 1;
    }

    pub fn count(&mut self, point: Vec<i32>) -> i32 {
        let (x, y) = (point[0], point[1]);
        let mut total = 0_i64;
        for (&key, &horizontal) in &self.frequencies {
            let (x2, y2) = (key / 1001, key % 1001);
            if y2 != y || x2 == x {
                continue;
            }
            let distance = (x2 - x).abs();
            total += horizontal as i64 * self.frequency(x, y + distance) * self.frequency(x2, y + distance);
            total += horizontal as i64 * self.frequency(x, y - distance) * self.frequency(x2, y - distance);
        }
        total as i32
    }

    fn frequency(&self, x: i32, y: i32) -> i64 {
        if !(0..=1000).contains(&y) {
            return 0;
        }
        *self.frequencies.get(&Self::encode(x, y)).unwrap_or(&0) as i64
    }

    fn encode(x: i32, y: i32) -> i32 {
        x * 1001 + y
    }
}
