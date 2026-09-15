pub struct Allocator {
    // Flat cell array holding each unit's mID (0 = free). allocate
    // linear-scans runs of free cells for the leftmost fit; freeMemory
    // sweeps the same array once, zeroing every match.
    units: Vec<i32>,
}

impl Allocator {
    pub fn new(n: i32) -> Self {
        Allocator {
            units: vec![0; n as usize],
        }
    }

    pub fn allocate(&mut self, size: i32, mID: i32) -> i32 {
        let total = self.units.len() as i32;
        let mut i = 0;
        while i < total {
            if self.units[i as usize] != 0 {
                i += 1;
                continue;
            }
            let mut j = i;
            while j < total && self.units[j as usize] == 0 {
                j += 1;
            }
            if j - i >= size {
                for k in i..i + size {
                    self.units[k as usize] = mID;
                }
                return i;
            }
            i = j;
        }
        -1
    }

    pub fn freeMemory(&mut self, mID: i32) -> i32 {
        let mut freed = 0;
        for unit in self.units.iter_mut() {
            if *unit == mID {
                *unit = 0;
                freed += 1;
            }
        }
        freed
    }
}
