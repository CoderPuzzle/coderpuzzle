pub struct DataStream {
    // Running length of the current suffix of matched values: a match
    // grows it, any other number resets it to zero, and consec is just
    // "has the streak reached k". The window of the last k integers is
    // summarized in one integer — nothing is buffered.
    value: i32,
    k: i32,
    streak: i32,
}

impl DataStream {
    pub fn new(value: i32, k: i32) -> Self {
        DataStream { value, k, streak: 0 }
    }

    pub fn consec(&mut self, num: i32) -> bool {
        self.streak = if num == self.value { self.streak + 1 } else { 0 };
        self.streak >= self.k
    }
}
