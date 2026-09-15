// A fixed buffer, a head index, and an occupied count: the count (not a
// tail index) distinguishes full from empty, so all k slots are usable;
// both ends are derivable, the rear sits at (head + count - 1) % k and
// the slot a front insert claims at (head + k - 1) % k.
pub struct MyCircularDeque {
    buf: Vec<i32>,
    head: usize,
    count: usize,
}

impl MyCircularDeque {
    pub fn new(k: i32) -> Self {
        MyCircularDeque {
            buf: vec![0; k as usize],
            head: 0,
            count: 0,
        }
    }

    pub fn insertFront(&mut self, value: i32) -> bool {
        if self.count == self.buf.len() {
            return false;
        }
        // Step head back one slot, modulo the ring, and write there.
        self.head = (self.head + self.buf.len() - 1) % self.buf.len();
        self.buf[self.head] = value;
        self.count += 1;
        true
    }

    pub fn insertLast(&mut self, value: i32) -> bool {
        if self.count == self.buf.len() {
            return false;
        }
        // The write slot is one past the current rear, modulo the ring.
        let tail = (self.head + self.count) % self.buf.len();
        self.buf[tail] = value;
        self.count += 1;
        true
    }

    pub fn deleteFront(&mut self) -> bool {
        if self.count == 0 {
            return false;
        }
        // Nothing to erase: the old head slot is simply written over once
        // the ring wraps back to it.
        self.head = (self.head + 1) % self.buf.len();
        self.count -= 1;
        true
    }

    pub fn deleteLast(&mut self) -> bool {
        if self.count == 0 {
            return false;
        }
        // The rear slot is derivable, so retiring it is just a count.
        self.count -= 1;
        true
    }

    pub fn getFront(&mut self) -> i32 {
        if self.count == 0 {
            return -1;
        }
        self.buf[self.head]
    }

    pub fn getRear(&mut self) -> i32 {
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
