use std::collections::BinaryHeap;

// A doubly-linked list of cells keeps stack order -- the tail is the top,
// so push, pop, and top touch only the tail cell -- while a max-heap of
// (value, cell index) pairs finds the maximum. Cell indices rise with every
// push -- the pool only grows -- and the heap prefers the larger one among
// equal values, so its top is the topmost duplicate maximum: exactly the
// element popMax must remove. A removal elsewhere in the list leaves the
// cell's heap entry stale, so each cell carries an alive flag and
// peekMax/popMax discard heap tops that name a dead cell: every stale entry
// is skipped at most once.
struct Cell {
    value: i32,
    prev: usize,
    next: usize,
    alive: bool,
}

pub struct MaxStack {
    cells: Vec<Cell>,               // index 0: head sentinel, 1: tail sentinel
    heap: BinaryHeap<(i32, usize)>, // (value, cell index)
}

impl MaxStack {
    pub fn new() -> Self {
        MaxStack {
            cells: vec![
                Cell {
                    value: 0,
                    prev: 1,
                    next: 1,
                    alive: false,
                },
                Cell {
                    value: 0,
                    prev: 0,
                    next: 0,
                    alive: false,
                },
            ],
            heap: BinaryHeap::new(),
        }
    }

    pub fn push(&mut self, x: i32) {
        let last = self.cells[1].prev;
        let index = self.cells.len();
        self.cells.push(Cell {
            value: x,
            prev: last,
            next: 1,
            alive: true,
        });
        self.cells[last].next = index;
        self.cells[1].prev = index;
        self.heap.push((x, index));
    }

    pub fn pop(&mut self) -> i32 {
        let index = self.cells[1].prev;
        let value = self.cells[index].value;
        self.unlink(index);
        value
    }

    pub fn top(&mut self) -> i32 {
        self.cells[self.cells[1].prev].value
    }

    pub fn peekMax(&mut self) -> i32 {
        while !self.cells[self.heap.peek().expect("nonempty stack").1].alive {
            self.heap.pop();
        }
        let index = self.heap.peek().expect("nonempty stack").1;
        self.cells[index].value
    }

    pub fn popMax(&mut self) -> i32 {
        while let Some((_, index)) = self.heap.pop() {
            if self.cells[index].alive {
                let value = self.cells[index].value;
                self.unlink(index);
                return value;
            }
        }
        unreachable!("the stack holds at least one element")
    }

    fn unlink(&mut self, index: usize) {
        let (prev, next) = (self.cells[index].prev, self.cells[index].next);
        self.cells[prev].next = next;
        self.cells[next].prev = prev;
        self.cells[index].alive = false;
    }
}
