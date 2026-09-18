use std::time::{SystemTime, UNIX_EPOCH};

pub struct Solution {
    rects: Vec<[i32; 4]>,
    prefix: Vec<i64>,
    state: u64, // SplitMix64 stream, seeded from the wall clock
}

impl Solution {
    // Prefix sums over rectangle areas (integer cells, (xi-ai+1)*(yi-bi+1))
    // select a rectangle with probability proportional to its area; a
    // uniform cell offset inside it yields the point — so every covered
    // integer point is exactly equally likely.
    pub fn new(rects: Vec<Vec<i32>>) -> Self {
        let mut prefix = Vec::with_capacity(rects.len() + 1);
        prefix.push(0);
        let mut compact = Vec::with_capacity(rects.len());
        for rect in &rects {
            let width = (rect[2] - rect[0] + 1) as i64;
            let height = (rect[3] - rect[1] + 1) as i64;
            prefix.push(prefix.last().copied().unwrap_or(0) + width * height);
            compact.push([rect[0], rect[1], rect[2], rect[3]]);
        }
        let nanos = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|elapsed| elapsed.as_nanos() as u64)
            .unwrap_or(0x2545_F491_4F6C_DD1D);
        Solution {
            rects: compact,
            prefix,
            state: nanos ^ ((std::process::id() as u64) << 32) | 1,
        }
    }

    fn next_u64(&mut self) -> u64 {
        self.state = self.state.wrapping_add(0x9E37_79B9_7F4A_7C15);
        let mut z = self.state;
        z = (z ^ (z >> 30)).wrapping_mul(0xBF58_476D_1CE4_E5B9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94D0_49BB_1331_11EB);
        z ^ (z >> 31)
    }

    pub fn pick(&mut self) -> Vec<i32> {
        let total = *self.prefix.last().unwrap() as u64;
        let cell = (self.next_u64() % total) as i64;
        // Number of prefix entries at or below the cell: the rectangle index.
        let index = self.prefix[1..].partition_point(|&area| area <= cell);
        let rect = self.rects[index];
        let width = (rect[2] - rect[0] + 1) as i64;
        let offset = cell - self.prefix[index];
        vec![rect[0] + (offset % width) as i32, rect[1] + (offset / width) as i32]
    }
}
