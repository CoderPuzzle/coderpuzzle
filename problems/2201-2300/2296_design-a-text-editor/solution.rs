// Two stacks split at the cursor: left holds the text before the cursor
// bottom-to-top, right the text after it nearest-char-on-top, so the
// characters adjacent to the cursor are always the two ends.
pub struct TextEditor {
    left: Vec<u8>,
    right: Vec<u8>,
}

impl TextEditor {
    pub fn new() -> Self {
        TextEditor {
            left: Vec::new(),
            right: Vec::new(),
        }
    }

    pub fn addText(&mut self, text: String) {
        self.left.extend_from_slice(text.as_bytes());
    }

    pub fn deleteText(&mut self, k: i32) -> i32 {
        let deleted = k.min(self.left.len() as i32);
        self.left.truncate(self.left.len() - deleted as usize);
        deleted
    }

    pub fn cursorLeft(&mut self, k: i32) -> String {
        Self::transfer(&mut self.left, &mut self.right, k);
        self.tail()
    }

    pub fn cursorRight(&mut self, k: i32) -> String {
        Self::transfer(&mut self.right, &mut self.left, k);
        self.tail()
    }

    // Moves min(k, len) characters from the end of `from` onto the end of
    // `to` — exactly the cursor sliding k positions.
    fn transfer(from: &mut Vec<u8>, to: &mut Vec<u8>, k: i32) {
        for _ in 0..k.min(from.len() as i32) {
            let ch = from.pop().expect("checked non-empty");
            to.push(ch);
        }
    }

    fn tail(&self) -> String {
        let start = self.left.len().saturating_sub(10);
        String::from_utf8_lossy(&self.left[start..]).into_owned()
    }
}
