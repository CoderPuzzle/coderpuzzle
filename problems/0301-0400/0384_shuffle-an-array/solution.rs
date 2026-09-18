use std::time::{SystemTime, UNIX_EPOCH};

pub struct Solution {
    original: Vec<i32>,
    state: u64, // SplitMix64 stream, seeded from the wall clock
}

impl Solution {
    // The pristine original is kept untouched; every shuffle() runs
    // Fisher-Yates on a fresh copy — slot i (from the top down) swaps with a
    // uniformly chosen slot in [0, i] — so each of the n! orderings is
    // exactly equally likely, and reset() is a plain copy.
    pub fn new(nums: Vec<i32>) -> Self {
        let nanos = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|elapsed| elapsed.as_nanos() as u64)
            .unwrap_or(0x2545_F491_4F6C_DD1D);
        Solution {
            original: nums,
            state: nanos ^ ((std::process::id() as u64) << 32) | 1,
        }
    }

    fn next_below(&mut self, bound: u64) -> u64 {
        self.next_u64() % bound
    }

    fn next_u64(&mut self) -> u64 {
        self.state = self.state.wrapping_add(0x9E37_79B9_7F4A_7C15);
        let mut z = self.state;
        z = (z ^ (z >> 30)).wrapping_mul(0xBF58_476D_1CE4_E5B9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94D0_49BB_1331_11EB);
        z ^ (z >> 31)
    }

    pub fn reset(&mut self) -> Vec<i32> {
        self.original.clone()
    }

    pub fn shuffle(&mut self) -> Vec<i32> {
        let mut array = self.original.clone();
        for i in (1..array.len()).rev() {
            let j = self.next_below(i as u64 + 1) as usize;
            array.swap(i, j);
        }
        array
    }
}
