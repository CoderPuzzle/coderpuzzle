use std::collections::VecDeque;

// One queue, rotated on push: the front is always the stack top, so
// pop/top/empty are single queue operations on the front.
pub struct MyStack {
    queue: VecDeque<i32>,
}

impl MyStack {
    pub fn new() -> Self {
        MyStack { queue: VecDeque::new() }
    }

    pub fn push(&mut self, x: i32) {
        self.queue.push_back(x);
        // Requeue everything that was below x, so x reaches the front.
        let rotations = self.queue.len() - 1;
        for _ in 0..rotations {
            let older = self.queue.pop_front().unwrap();
            self.queue.push_back(older);
        }
    }

    pub fn pop(&mut self) -> i32 {
        // The statement guarantees every pop sees a non-empty stack.
        self.queue.pop_front().unwrap()
    }

    pub fn top(&mut self) -> i32 {
        self.queue.front().copied().unwrap()
    }

    pub fn empty(&mut self) -> bool {
        self.queue.is_empty()
    }
}
