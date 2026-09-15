// A running (mult, add) pair represents the affine transform every
// already-appended value has picked up so far: current value = stored *
// mult + add (mod MOD). addAll/multAll only touch that pair — O(1) — and
// never walk the sequence. append folds the transform's inverse into the
// value being stored, so that re-applying the transform later reproduces
// exactly the value that was appended, no matter how many addAll/multAll
// calls land in between.
const MOD: i64 = 1_000_000_007;

pub struct Fancy {
    mult: i64,
    add: i64,
    stored: Vec<i64>,
}

fn mod_pow(mut base: i64, mut exp: i64, modulus: i64) -> i64 {
    let mut result = 1i64;
    base %= modulus;
    while exp > 0 {
        if exp & 1 == 1 {
            result = result * base % modulus;
        }
        base = base * base % modulus;
        exp >>= 1;
    }
    result
}

impl Fancy {
    pub fn new() -> Self {
        Fancy {
            mult: 1,
            add: 0,
            stored: Vec::new(),
        }
    }

    pub fn append(&mut self, val: i32) {
        // Undo the current transform up front: stored * mult + add == val,
        // so stored == (val - add) * inverse(mult) (mod MOD). mult is
        // never 0 mod MOD (each multAll factor is 1..100, and MOD is
        // prime), so the modular inverse always exists.
        let inv = mod_pow(self.mult, MOD - 2, MOD);
        let diff = ((val as i64 - self.add) % MOD + MOD) % MOD;
        self.stored.push(diff * inv % MOD);
    }

    pub fn addAll(&mut self, inc: i32) {
        self.add = (self.add + inc as i64) % MOD;
    }

    pub fn multAll(&mut self, m: i32) {
        self.mult = self.mult * m as i64 % MOD;
        self.add = self.add * m as i64 % MOD;
    }

    pub fn getIndex(&mut self, idx: i32) -> i32 {
        if idx < 0 || idx as usize >= self.stored.len() {
            return -1;
        }
        ((self.stored[idx as usize] * self.mult + self.add) % MOD) as i32
    }
}
