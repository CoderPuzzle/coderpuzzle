// Uploaded marks in a boolean array plus a prefix pointer that only
// moves forward. upload() sets one mark; longest() advances the pointer
// while the next video is already uploaded. The pointer never retreats,
// so its total travel across all calls is bounded by n and every query
// is amortized constant.
pub struct LUPrefix {
    n: i32,
    uploaded: Vec<bool>,
    prefix: i32,
}

impl LUPrefix {
    pub fn new(n: i32) -> Self {
        LUPrefix {
            n,
            uploaded: vec![false; n as usize + 1],
            prefix: 0,
        }
    }

    pub fn upload(&mut self, video: i32) {
        self.uploaded[video as usize] = true;
    }

    pub fn longest(&mut self) -> i32 {
        while self.prefix < self.n && self.uploaded[(self.prefix + 1) as usize] {
            self.prefix += 1;
        }
        self.prefix
    }
}
