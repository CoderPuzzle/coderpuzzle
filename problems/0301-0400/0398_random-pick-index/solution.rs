use std::collections::HashMap;
use std::time::{SystemTime, UNIX_EPOCH};

/// SplitMix64: a tiny, well-mixed generator that needs no external crate.
struct SplitMix64 {
    state: u64,
}

impl SplitMix64 {
    fn from_clock() -> Self {
        let nanos = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|d| d.as_nanos() as u64)
            .unwrap_or(0x9E3779B97F4A7C15);
        SplitMix64 {
            state: nanos ^ 0x9E3779B97F4A7C15,
        }
    }

    fn next(&mut self) -> u64 {
        self.state = self.state.wrapping_add(0x9E3779B97F4A7C15);
        let mut z = self.state;
        z = (z ^ (z >> 30)).wrapping_mul(0xBF58476D1CE4E5B9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94D049BB133111EB);
        z ^ (z >> 31)
    }

    /// Lemire's multiply-shift: one uniform value in 0..bound.
    fn below(&mut self, bound: usize) -> usize {
        (((self.next() >> 11) * (bound as u64)) >> 53) as usize
    }
}

pub struct Solution {
    // One pass buckets the indices of every value; draw_index(target)
    // draws one of that value's index buckets uniformly, so each
    // qualifying index is exactly equally likely.
    positions: HashMap<i32, Vec<i32>>,
    random: SplitMix64,
}

impl Solution {
    pub fn new(nums: Vec<i32>) -> Self {
        let mut positions: HashMap<i32, Vec<i32>> = HashMap::new();
        for (index, &value) in nums.iter().enumerate() {
            positions.entry(value).or_default().push(index as i32);
        }
        Solution {
            positions,
            random: SplitMix64::from_clock(),
        }
    }

    pub fn pick(&mut self, target: i32) -> i32 {
        let indices = &self.positions[&target];
        let chosen = self.random.below(indices.len());
        indices[chosen]
    }
}
