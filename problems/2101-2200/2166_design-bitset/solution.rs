// A bit array plus a lazy orientation flag. The stored byte always
// means "effective bit XOR flag", so fix/unfix complement their write
// while the set is flipped, flip() only toggles the flag and re-derives
// ones as size - ones, and all/one/count just read the counter.
// toString is the one place every bit passes through the flag again.
pub struct Bitset {
    bits: Vec<u8>,
    flipped: bool,
    ones: i32,
}

impl Bitset {
    pub fn new(size: i32) -> Self {
        Bitset {
            bits: vec![0; size as usize],
            flipped: false,
            ones: 0,
        }
    }

    pub fn fix(&mut self, idx: i32) {
        let index = idx as usize;
        if (self.bits[index] ^ self.flipped as u8) == 0 {
            self.bits[index] = !self.flipped as u8;
            self.ones += 1;
        }
    }

    pub fn unfix(&mut self, idx: i32) {
        let index = idx as usize;
        if (self.bits[index] ^ self.flipped as u8) == 1 {
            self.bits[index] = self.flipped as u8;
            self.ones -= 1;
        }
    }

    pub fn flip(&mut self) {
        self.flipped = !self.flipped;
        self.ones = self.bits.len() as i32 - self.ones;
    }

    pub fn all(&mut self) -> bool {
        self.ones == self.bits.len() as i32
    }

    pub fn one(&mut self) -> bool {
        self.ones > 0
    }

    pub fn count(&mut self) -> i32 {
        self.ones
    }

    pub fn toString(&mut self) -> String {
        let flag = self.flipped as u8;
        self.bits.iter().map(|&bit| (b'0' + (bit ^ flag)) as char).collect()
    }
}
