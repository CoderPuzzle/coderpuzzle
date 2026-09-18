// Walker alias table: n columns of height total, index i's own material
// filling weights[i] * n of its column and a donor's topping up the rest;
// one uniform cell of the n * total grid lands on index i's material with
// probability exactly weights[i] / total. The draw is a splitmix64
// stream; std ships no RNG, so the tiny generator lives here.
pub struct Solution {
    columns: usize,
    total: u64,
    height: Vec<u64>,
    alias: Vec<usize>,
    random: u64,
}

impl Solution {
    pub fn new(weights: Vec<i32>) -> Self {
        let n = weights.len();
        let total: u64 = weights.iter().map(|&weight| weight as u64).sum();
        let mut height: Vec<u64> = weights.iter().map(|&weight| weight as u64 * n as u64).collect();
        let mut alias = vec![0usize; n];
        let mut small: Vec<usize> = (0..n).filter(|&c| height[c] < total).collect();
        let mut large: Vec<usize> = (0..n).filter(|&c| height[c] >= total).collect();
        while !small.is_empty() && !large.is_empty() {
            let under = small.pop().unwrap();
            let over = large.pop().unwrap();
            alias[under] = over;
            height[over] -= total - height[under];
            if height[over] < total {
                small.push(over);
            } else if height[over] > total {
                large.push(over);
            }
        }
        Solution {
            columns: n,
            total,
            height,
            alias,
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
        let span = self.columns as u64 * self.total;
        let cell = self.next_u64() % span;
        let column = (cell % self.columns as u64) as usize;
        // level under the column's own material, else its alias
        let level = cell / self.columns as u64;
        if level < self.height[column] {
            column as i32
        } else {
            self.alias[column] as i32
        }
    }
}
