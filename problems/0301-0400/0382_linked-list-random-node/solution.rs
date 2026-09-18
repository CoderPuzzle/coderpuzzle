// The list is materialized once as an array of node values (the wire
// form already lists them in order). draw draws one slot uniformly from a
// splitmix64 stream; std ships no RNG, so the tiny generator lives here.
pub struct Solution {
    values: Vec<i32>,
    random: u64,
}

impl Solution {
    pub fn new(head: Vec<i32>) -> Self {
        Solution {
            values: head,
            random: 0x9E3779B97F4A7C15,
        }
    }

    fn next_u64(&mut self) -> u64 {
        self.random = self.random.wrapping_add(0x9E3779B97F4A7C15);
        let mut z = self.random;
        z = (z ^ (z >> 30)).wrapping_mul(0xBF58476D1CE4E5B9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94D049BB133111EB);
        z ^ (z >> 31)
    }

    pub fn getRandom(&mut self) -> i32 {
        let slot = (self.next_u64() % self.values.len() as u64) as usize;
        self.values[slot]
    }
}
