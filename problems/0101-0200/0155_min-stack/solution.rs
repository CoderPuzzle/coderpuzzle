pub struct MinStack {
    stack: Vec<(i32, i32)>, // (value, minimum-so-far)
}

impl MinStack {
    pub fn new() -> Self {
        MinStack { stack: Vec::new() }
    }

    pub fn push(&mut self, value: i32) {
        // Snapshot the minimum of the stack as of this push: the new value
        // combined with the minimum of the entry below.
        let running = match self.stack.last() {
            Some(&(_, minimum)) => value.min(minimum),
            None => value,
        };
        self.stack.push((value, running));
    }

    pub fn pop(&mut self) {
        // A pop restores an earlier stack state whose exposed entry already
        // holds that state's minimum — no recomputation needed.
        self.stack.pop();
    }

    pub fn top(&mut self) -> i32 {
        self.stack.last().unwrap().0
    }

    pub fn getMin(&mut self) -> i32 {
        // The top pair alone answers both queries in O(1).
        self.stack.last().unwrap().1
    }
}
