// Two read positions — one per vector — and a turn flag naming the vector
// that serves next. Nothing is flattened or queued at construction: the
// whole zigzag policy lives in next, which hands the turn to the other
// vector when the one whose turn it is has run dry. hasNext is a pure
// query — one live index anywhere means elements remain — so it never
// mutates state and any number of calls between nexts is harmless.
pub struct ZigzagIterator {
    v1: Vec<i32>,
    v2: Vec<i32>,
    i1: usize,
    i2: usize,
    turn: u8,
}

impl ZigzagIterator {
    pub fn new(v1: Vec<i32>, v2: Vec<i32>) -> Self {
        // No copies, no queue: only how far each vector has been served
        // (i1, i2) and whose turn is next (0 for v1, 1 for v2).
        ZigzagIterator {
            v1,
            v2,
            i1: 0,
            i2: 0,
            turn: 0,
        }
    }

    pub fn next(&mut self) -> i32 {
        // A vector whose turn it is may have run dry — it was the shorter
        // one, or its last element was just served — and then the turn
        // passes to the other before anything is read.
        if self.turn == 0 && self.i1 == self.v1.len() {
            self.turn = 1;
        }
        if self.turn == 1 && self.i2 == self.v2.len() {
            self.turn = 0;
        }
        let value = if self.turn == 0 {
            let value = self.v1[self.i1];
            self.i1 += 1;
            value
        } else {
            let value = self.v2[self.i2];
            self.i2 += 1;
            value
        };
        // Serve one element, then hand the turn over unconditionally: the
        // vectors alternate strictly while both still have elements.
        self.turn = 1 - self.turn;
        value
    }

    pub fn hasNext(&mut self) -> bool {
        // Pure query: the turn flag is irrelevant to whether anything
        // remains — one live index anywhere means yes.
        self.i1 < self.v1.len() || self.i2 < self.v2.len()
    }
}
