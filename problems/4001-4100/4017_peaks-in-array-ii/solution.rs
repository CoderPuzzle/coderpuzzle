struct Fenwick {
    n: i64,
    bit: Vec<i64>,
}

impl Fenwick {
    fn new(n: i64) -> Self {
        Fenwick {
            n,
            bit: vec![0; (n + 1) as usize],
        }
    }

    fn add(&mut self, i: i64, delta: i64) {
        let mut i = i + 1;
        while i <= self.n {
            self.bit[i as usize] += delta;
            i += i & i.wrapping_neg();
        }
    }

    fn prefix(&self, i: i64) -> i64 {
        let mut i = i + 1;
        let mut total = 0;
        while i > 0 {
            total += self.bit[i as usize];
            i -= i & i.wrapping_neg();
        }
        total
    }

    fn range_sum(&self, l: i64, r: i64) -> i64 {
        self.prefix(r) - self.prefix(l - 1)
    }
}

impl Solution {
    pub fn count_of_peaks(mut nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i64> {
        let n = nums.len() as i64;

        // Ordered peak positions plus a Fenwick tree holding
        // value[p] = p * (p - prev(p)) for every present peak p.
        let is_peak = |nums: &Vec<i32>, i: i64| -> bool {
            i > 0 && i < n - 1 && nums[i as usize] > nums[(i - 1) as usize] && nums[i as usize] > nums[(i + 1) as usize]
        };

        let mut peaks: std::collections::BTreeSet<i64> = std::collections::BTreeSet::new();
        let mut fen = Fenwick::new(n);

        let insert_peak = |peaks: &mut std::collections::BTreeSet<i64>, fen: &mut Fenwick, x: i64| {
            let prev_p = match peaks.range(..x).next_back() {
                Some(&p) => p,
                None => 0,
            };
            let next_p = peaks.range(x + 1..).next().copied();
            peaks.insert(x);
            fen.add(x, x * (x - prev_p));
            if let Some(s) = next_p {
                fen.add(s, s * (s - x) - s * (s - prev_p));
            }
        };
        let remove_peak = |peaks: &mut std::collections::BTreeSet<i64>, fen: &mut Fenwick, x: i64| {
            let prev_p = match peaks.range(..x).next_back() {
                Some(&p) => p,
                None => 0,
            };
            let next_p = peaks.range(x + 1..).next().copied();
            peaks.remove(&x);
            fen.add(x, -(x * (x - prev_p)));
            if let Some(s) = next_p {
                fen.add(s, s * (s - prev_p) - s * (s - x));
            }
        };

        for i in 1..n - 1 {
            if is_peak(&nums, i) {
                insert_peak(&mut peaks, &mut fen, i);
            }
        }

        let mut answer: Vec<i64> = Vec::new();
        for q in &queries {
            if q[0] == 1 {
                let l = q[1] as i64;
                let r = q[2] as i64;
                let a = match peaks.range(l + 1..).next().copied() {
                    Some(a) if a < r => a,
                    _ => {
                        answer.push(0);
                        continue;
                    }
                };
                let b = *peaks.range(..r).next_back().unwrap();
                let qv = peaks.range(..a).next_back().copied().unwrap_or(0);
                let w = fen.range_sum(a, b);
                answer.push(r * (b - l) - w + a * (l - qv));
            } else {
                let idx = q[1] as i64;
                let val = q[2];
                for j in (idx - 1).max(0)..=(idx + 1).min(n - 1) {
                    if is_peak(&nums, j) {
                        remove_peak(&mut peaks, &mut fen, j);
                    }
                }
                nums[idx as usize] = val;
                for j in (idx - 1).max(0)..=(idx + 1).min(n - 1) {
                    if is_peak(&nums, j) {
                        insert_peak(&mut peaks, &mut fen, j);
                    }
                }
            }
        }
        answer
    }
}
