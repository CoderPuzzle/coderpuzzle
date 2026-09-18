// Prefix sums lay the weights end to end over [0, total); one uniform
// draw lands in exactly one segment, so index i comes back with
// probability exactly weights[i] / total. The draw is a splitmix64
// stream; std ships no RNG, so the tiny generator lives here.
pub struct Solution {
    prefix: Vec<i64>,
    random: u64,
}

impl Solution {
    pub fn new(weights: Vec<i32>) -> Self {
        let mut prefix = Vec::with_capacity(weights.len() + 1);
        prefix.push(0);
        for weight in weights {
            prefix.push(*prefix.last().unwrap() + weight as i64);
        }
        Solution {
            prefix,
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

    pub fn pickIndex(&mut self) -> i32 {
        let total = *self.prefix.last().unwrap() as u64;
        let target = 1 + (self.next_u64() % total) as i64;
        // first index with prefix[i] >= target, minus one
        (self.prefix.partition_point(|&sum| sum < target) - 1) as i32
    }
}
