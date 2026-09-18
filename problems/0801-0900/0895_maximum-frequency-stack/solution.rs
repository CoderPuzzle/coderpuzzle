use std::collections::HashMap;

pub struct FreqStack {
    freq: HashMap<i32, i32>,
    groups: Vec<Vec<i32>>,
    maxfreq: i32,
}

impl FreqStack {
    pub fn new() -> Self {
        FreqStack {
            freq: HashMap::new(),
            groups: Vec::new(),
            maxfreq: 0,
        }
    }

    pub fn push(&mut self, val: i32) {
        let frequency = self.freq.get(&val).copied().unwrap_or(0) + 1;
        self.freq.insert(val, frequency);
        while self.groups.len() < frequency as usize {
            self.groups.push(Vec::new());
        }
        self.groups[frequency as usize - 1].push(val);
        if frequency > self.maxfreq {
            self.maxfreq = frequency;
        }
    }

    pub fn pop(&mut self) -> i32 {
        let top = &mut self.groups[self.maxfreq as usize - 1];
        let val = top.pop().unwrap();
        if top.is_empty() {
            self.maxfreq -= 1;
        }
        *self.freq.get_mut(&val).unwrap() -= 1;
        val
    }
}
