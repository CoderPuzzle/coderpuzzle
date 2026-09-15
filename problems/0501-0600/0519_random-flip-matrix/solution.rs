pub struct Solution {
    columns: i32,
    total: usize,
    remaining: usize,
    mapping: std::collections::HashMap<i32, i32>,
    state: u64,
}

impl Solution {
    pub fn new(m: i32, n: i32) -> Self {
        let total = (m * n) as usize;
        Solution {
            columns: n,
            total,
            remaining: total,
            mapping: std::collections::HashMap::new(),
            state: 0x9E37_79B9_7F4A_7C15,
        }
    }

    // xorshift64*: the std-free randomness the design probe shape uses.
    fn next_random(&mut self) -> usize {
        self.state ^= self.state >> 12;
        self.state ^= self.state << 25;
        self.state ^= self.state >> 27;
        (self.state.wrapping_mul(0x2545_F491_4F6C_DD1D) >> 33) as usize
    }

    pub fn flip(&mut self) -> Vec<i32> {
        let index = self.next_random() % self.remaining;
        let value = *self.mapping.get(&(index as i32)).unwrap_or(&(index as i32));
        let last = self.remaining - 1;
        let last_value = *self.mapping.get(&(last as i32)).unwrap_or(&(last as i32));
        self.mapping.remove(&(last as i32));
        if index != last {
            self.mapping.insert(index as i32, last_value);
        }
        self.remaining = last;
        vec![value / self.columns, value % self.columns]
    }

    pub fn reset(&mut self) {
        self.remaining = self.total;
        self.mapping.clear();
    }
}
