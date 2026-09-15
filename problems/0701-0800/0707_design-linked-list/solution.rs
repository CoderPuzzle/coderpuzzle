// A singly linked list behind a sentinel head, with the length kept in a
// counter so every index check is a comparison instead of a walk: all insert
// positions funnel through addAtIndex, and the boundary rules (index ==
// length appends, index > length is a no-op, invalid reads return -1,
// invalid deletes are skipped) live in exactly one place each.
struct MyNode {
    val: i32,
    next: Option<Box<MyNode>>,
}

pub struct MyLinkedList {
    head: MyNode, // sentinel: always present, never carries data
    size: usize,
}

impl MyLinkedList {
    pub fn new() -> Self {
        MyLinkedList {
            head: MyNode { val: 0, next: None },
            size: 0,
        }
    }

    // The slot holding the cell at position index, for 0 <= index <= size:
    // the sentinel's next for index 0, the (index-1)-th cell's next otherwise.
    fn before(&mut self, index: usize) -> &mut Option<Box<MyNode>> {
        let mut slot = &mut self.head.next;
        for _ in 0..index {
            slot = &mut slot.as_mut().unwrap().next;
        }
        slot
    }

    pub fn get(&mut self, index: i32) -> i32 {
        if index < 0 || index as usize >= self.size {
            return -1;
        }
        self.before(index as usize).as_ref().unwrap().val
    }

    pub fn addAtHead(&mut self, val: i32) {
        self.addAtIndex(0, val);
    }

    pub fn addAtTail(&mut self, val: i32) {
        self.addAtIndex(self.size as i32, val);
    }

    pub fn addAtIndex(&mut self, index: i32, val: i32) {
        if index > self.size as i32 {
            return;
        }
        let index = index.max(0) as usize;
        let slot = self.before(index);
        let fresh = Box::new(MyNode { val, next: slot.take() });
        *slot = Some(fresh);
        self.size += 1;
    }

    pub fn deleteAtIndex(&mut self, index: i32) {
        if index < 0 || index as usize >= self.size {
            return;
        }
        let slot = self.before(index as usize);
        if let Some(removed) = slot.take() {
            *slot = removed.next;
        }
        self.size -= 1;
    }
}
