// Two stacks, transferred lazily: the in stack holds new arrivals, the
// out stack serves the front once the reversal has happened. Each stack is
// a Vec — Rust's stack, used only through push/pop/last.
pub struct MyQueue {
    in_stack: Vec<i32>,  // top = newest push
    out_stack: Vec<i32>, // top = oldest element (queue front)
}

impl MyQueue {
    pub fn new() -> Self {
        MyQueue {
            in_stack: Vec::new(),
            out_stack: Vec::new(),
        }
    }

    pub fn push(&mut self, x: i32) {
        self.in_stack.push(x);
    }

    pub fn pop(&mut self) -> i32 {
        // The statement guarantees every pop sees a non-empty queue.
        self.transfer_if_needed();
        self.out_stack.pop().unwrap()
    }

    pub fn peek(&mut self) -> i32 {
        self.transfer_if_needed();
        *self.out_stack.last().unwrap()
    }

    pub fn empty(&mut self) -> bool {
        self.in_stack.is_empty() && self.out_stack.is_empty()
    }

    fn transfer_if_needed(&mut self) {
        // Only when the out stack is dry; pushing onto leftovers would put
        // newcomers ahead of them. The reversal parks the oldest element
        // on top of the out stack.
        if self.out_stack.is_empty() {
            while let Some(value) = self.in_stack.pop() {
                self.out_stack.push(value);
            }
        }
    }
}
