// Two coordinates — a row pointer and a column pointer — advanced lazily
// over the vector exactly as it stands: the pair is only moved onto a live
// element when a call needs one, so construction does no work beyond
// remembering the input. hasNext owns the skipping: it walks row past every
// row col has exhausted (empty from the start, or fully served), which lets
// next read vec[row][col] without any special cases.
pub struct Vector2D {
    vec: Vec<Vec<i32>>,
    row: usize,
    col: usize,
}

impl Vector2D {
    pub fn new(vec: Vec<Vec<i32>>) -> Self {
        // No flattened copy here — that laziness is the problem. An empty
        // (or exhausted) row is stepped over only when a call forces it.
        Vector2D { vec, row: 0, col: 0 }
    }

    pub fn next(&mut self) -> i32 {
        // Establish the invariant before reading: after this call the
        // coordinates are guaranteed to sit on a live element.
        self.hasNext();
        let value = self.vec[self.row][self.col];
        // Step within the row; once it runs dry, the next hasNext() moves
        // on to the next row instead.
        self.col += 1;
        value
    }

    pub fn hasNext(&mut self) -> bool {
        // The invariant repair: skip rows already drained, zeroing the
        // column pointer as each new row is entered.
        while self.row < self.vec.len() && self.col == self.vec[self.row].len() {
            self.row += 1;
            self.col = 0;
        }
        self.row < self.vec.len()
    }
}
