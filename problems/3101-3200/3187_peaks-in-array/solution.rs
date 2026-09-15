struct Fenwick {
    n: usize,
    bit: Vec<i32>,
}

impl Fenwick {
    fn new(n: usize) -> Self {
        Fenwick { n, bit: vec![0; n + 1] }
    }

    fn add(&mut self, i: usize, delta: i32) {
        let mut i = i + 1;
        while i <= self.n {
            self.bit[i] += delta;
            i += i & i.wrapping_neg();
        }
    }

    fn prefix(&self, i: usize) -> i32 {
        let mut i = i + 1;
        let mut total = 0;
        while i > 0 {
            total += self.bit[i];
            i -= i & i.wrapping_neg();
        }
        total
    }

    fn range_sum(&self, l: usize, r: usize) -> i32 {
        if l > r {
            return 0;
        }
        if l == 0 {
            return self.prefix(r);
        }
        self.prefix(r) - self.prefix(l - 1)
    }
}

impl Solution {
    pub fn count_of_peaks(mut nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let n = nums.len();

        let is_peak = |nums: &Vec<i32>, i: usize| -> bool {
            i > 0 && i + 1 < n && nums[i] > nums[i - 1] && nums[i] > nums[i + 1]
        };

        let mut fen = Fenwick::new(n);
        for i in 0..n {
            if is_peak(&nums, i) {
                fen.add(i, 1);
            }
        }

        let mut answer: Vec<i32> = Vec::new();
        for q in &queries {
            if q[0] == 1 {
                let l = q[1] as usize;
                let r = q[2] as usize;
                if r < l + 2 {
                    answer.push(0);
                } else {
                    answer.push(fen.range_sum(l + 1, r - 1));
                }
            } else {
                let idx = q[1] as usize;
                let val = q[2];
                let lo = idx.saturating_sub(1);
                let hi = (idx + 1).min(n - 1);
                for j in lo..=hi {
                    if is_peak(&nums, j) {
                        fen.add(j, -1);
                    }
                }
                nums[idx] = val;
                for j in lo..=hi {
                    if is_peak(&nums, j) {
                        fen.add(j, 1);
                    }
                }
            }
        }
        answer
    }
}
