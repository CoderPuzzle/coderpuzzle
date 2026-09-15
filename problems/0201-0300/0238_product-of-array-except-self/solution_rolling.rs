// The judge's expected values are exact big integers, so the products are
// computed with a small base-1e9 bignum. The harness serializes the return
// value via the CoderPuzzleToJson trait, so the bignum implements it directly and
// renders itself as a bare integer token.
#[derive(Clone)]
struct CoderPuzzleBig {
    neg: bool,
    d: Vec<u64>, // base 1_000_000_000, little-endian; empty = zero
}

impl CoderPuzzleBig {
    fn one() -> CoderPuzzleBig {
        CoderPuzzleBig { neg: false, d: vec![1] }
    }

    fn zero() -> CoderPuzzleBig {
        CoderPuzzleBig {
            neg: false,
            d: Vec::new(),
        }
    }

    fn mul_small(&self, v: i32) -> CoderPuzzleBig {
        if v == 0 || self.d.is_empty() {
            return CoderPuzzleBig::zero();
        }
        let neg = self.neg != (v < 0);
        let x = (v as i64).unsigned_abs();
        let mut d = Vec::with_capacity(self.d.len() + 2);
        let mut carry: u64 = 0;
        for &digit in &self.d {
            let cur = digit * x + carry;
            d.push(cur % 1_000_000_000);
            carry = cur / 1_000_000_000;
        }
        while carry > 0 {
            d.push(carry % 1_000_000_000);
            carry /= 1_000_000_000;
        }
        CoderPuzzleBig { neg, d }
    }

    fn mul_big(&self, other: &CoderPuzzleBig) -> CoderPuzzleBig {
        if self.d.is_empty() || other.d.is_empty() {
            return CoderPuzzleBig::zero();
        }
        let mut d = vec![0u64; self.d.len() + other.d.len() + 1];
        for i in 0..self.d.len() {
            let mut carry: u64 = 0;
            let mut j = 0;
            while j < other.d.len() || carry > 0 {
                let mut cur = d[i + j] + carry;
                if j < other.d.len() {
                    cur += self.d[i] * other.d[j];
                }
                d[i + j] = cur % 1_000_000_000;
                carry = cur / 1_000_000_000;
                j += 1;
            }
        }
        while d.last() == Some(&0) {
            d.pop();
        }
        CoderPuzzleBig {
            neg: self.neg != other.neg,
            d,
        }
    }

    fn text(&self) -> String {
        if self.d.is_empty() {
            return "0".to_string();
        }
        let mut s = String::new();
        if self.neg {
            s.push('-');
        }
        s.push_str(&self.d[self.d.len() - 1].to_string());
        for digit in self.d.iter().rev().skip(1) {
            s.push_str(&format!("{:09}", digit));
        }
        s
    }
}

impl CoderPuzzleToJson for CoderPuzzleBig {
    fn coderpuzzle_json(&self) -> Result<String, String> {
        Ok(self.text())
    }
}

impl Solution {
    pub fn product_except_self(nums: Vec<i32>) -> Vec<CoderPuzzleBig> {
        // The product except nums[i] factors as (product of everything
        // before i) x (product of everything after i), both computable as
        // running products — no division, which zeros would break anyway.
        let n = nums.len();
        let mut answer = vec![CoderPuzzleBig::one(); n];
        // First sweep stores the running left product BEFORE folding nums[i]
        // in, so answer[i] ends up holding exactly the prefix preceding i.
        let mut left = CoderPuzzleBig::one();
        for i in 0..n {
            answer[i] = left.clone();
            left = left.mul_small(nums[i]);
        }
        // Second sweep from the right: its running product likewise lags one
        // position behind, then absorbs nums[i]. Each cell becomes
        // prefix x suffix.
        let mut right = CoderPuzzleBig::one();
        for i in (0..n).rev() {
            answer[i] = answer[i].mul_big(&right);
            right = right.mul_small(nums[i]);
        }
        // Zeros need no special casing: a lone zero zeroes every cell but its
        // own, and multiple zeros zero everything — all automatic.
        answer
    }
}
