// A fixed buffer, a head index, and an occupied count: the count (not a
// tail index) distinguishes full from empty, so all k slots are usable;
// the tail position is always derivable as (head + count) % k.
pub struct MyCircularQueue {
    buf: Vec<i32>,
    head: usize,
    count: usize,
}

impl MyCircularQueue {
    pub fn new(k: i32) -> Self {
        MyCircularQueue {
            buf: vec![0; k as usize],
            head: 0,
            count: 0,
        }
    }

    pub fn enQueue(&mut self, value: i32) -> bool {
        if self.count == self.buf.len() {
            return false;
        }
        // The write slot is one past the current rear, modulo the ring.
        let tail = (self.head + self.count) % self.buf.len();
        self.buf[tail] = value;
        self.count += 1;
        true
    }

    pub fn deQueue(&mut self) -> bool {
        if self.count == 0 {
            return false;
        }
        // Nothing to erase: the old head slot is simply written over once
        // the ring wraps back to it.
        self.head = (self.head + 1) % self.buf.len();
        self.count -= 1;
        true
    }

    pub fn Front(&mut self) -> i32 {
        if self.count == 0 {
            return -1;
        }
        self.buf[self.head]
    }

    pub fn Rear(&mut self) -> i32 {
        if self.count == 0 {
            return -1;
        }
        let rear = (self.head + self.count - 1) % self.buf.len();
        self.buf[rear]
    }

    pub fn isEmpty(&mut self) -> bool {
        self.count == 0
    }

    pub fn isFull(&mut self) -> bool {
        self.count == self.buf.len()
    }
}
