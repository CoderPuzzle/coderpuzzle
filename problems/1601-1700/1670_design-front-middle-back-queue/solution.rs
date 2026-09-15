use std::collections::VecDeque;

// Two deques split at the middle: front holds the first ceil(n/2)
// elements, back the rest, so the middle always sits at an end of each
// deque — balance restores the split after every mutating call.
pub struct FrontMiddleBackQueue {
    front: VecDeque<i32>,
    back: VecDeque<i32>,
}

impl FrontMiddleBackQueue {
    pub fn new() -> Self {
        FrontMiddleBackQueue {
            front: VecDeque::new(),
            back: VecDeque::new(),
        }
    }

    pub fn pushFront(&mut self, val: i32) {
        self.front.push_front(val);
        self.balance();
    }

    pub fn pushMiddle(&mut self, val: i32) {
        // The new element must land one slot before the current back of
        // front (the frontmost middle of the result), so when front is
        // the bigger half, its last element moves to back first — the
        // push_back then writes exactly the middle slot.
        if self.front.len() > self.back.len() {
            if let Some(middle) = self.front.pop_back() {
                self.back.push_front(middle);
            }
        }
        self.front.push_back(val);
    }

    pub fn pushBack(&mut self, val: i32) {
        self.back.push_back(val);
        self.balance();
    }

    pub fn popFront(&mut self) -> i32 {
        match self.front.pop_front() {
            Some(val) => {
                self.balance();
                val
            }
            None => -1,
        }
    }

    pub fn popMiddle(&mut self) -> i32 {
        // ceil(n/2) elements in front means the frontmost middle — the
        // back of front — at every length, odd or even.
        match self.front.pop_back() {
            Some(val) => {
                self.balance();
                val
            }
            None => -1,
        }
    }

    pub fn popBack(&mut self) -> i32 {
        let val = match self.back.pop_back() {
            Some(val) => val,
            None => match self.front.pop_back() {
                Some(val) => val,
                None => return -1,
            },
        };
        self.balance();
        val
    }

    fn balance(&mut self) {
        if self.front.len() > self.back.len() + 1 {
            if let Some(middle) = self.front.pop_back() {
                self.back.push_front(middle);
            }
        } else if self.front.len() < self.back.len() {
            if let Some(tip) = self.back.pop_front() {
                self.front.push_back(tip);
            }
        }
    }
}
