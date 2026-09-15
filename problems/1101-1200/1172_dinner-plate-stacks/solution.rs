use std::cmp::Reverse;
use std::collections::BinaryHeap;

pub struct DinnerPlates {
    capacity: usize,
    stacks: Vec<Vec<i32>>,
    vacant: BinaryHeap<Reverse<usize>>,
}

impl DinnerPlates {
    pub fn new(capacity: i32) -> Self {
        Self {
            capacity: capacity as usize,
            stacks: Vec::new(),
            vacant: BinaryHeap::new(),
        }
    }

    pub fn push(&mut self, val: i32) {
        while let Some(&Reverse(index)) = self.vacant.peek() {
            if index >= self.stacks.len() || self.stacks[index].len() == self.capacity {
                self.vacant.pop();
            } else {
                break;
            }
        }
        if let Some(Reverse(index)) = self.vacant.pop() {
            self.stacks[index].push(val);
            if self.stacks[index].len() < self.capacity {
                self.vacant.push(Reverse(index));
            }
        } else if self.stacks.last().is_some_and(|stack| stack.len() < self.capacity) {
            self.stacks.last_mut().unwrap().push(val);
        } else {
            self.stacks.push(vec![val]);
        }
    }

    pub fn pop(&mut self) -> i32 {
        while self.stacks.last().is_some_and(Vec::is_empty) {
            self.stacks.pop();
        }
        self.stacks.last_mut().and_then(Vec::pop).unwrap_or(-1)
    }

    pub fn popAtStack(&mut self, index: i32) -> i32 {
        let index = index as usize;
        if index >= self.stacks.len() || self.stacks[index].is_empty() {
            return -1;
        }
        let value = self.stacks[index].pop().unwrap();
        self.vacant.push(Reverse(index));
        value
    }
}
