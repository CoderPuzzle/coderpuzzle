impl Solution {
    // Scan left to right. 'G' emits "G" and advances 1. An open paren
    // can only begin "()" or "(al)": peek the next character — ')' emits
    // "o" and advances 2, 'a' emits "al" and advances 4.
    pub fn interpret(command: String) -> String {
        let command = command.as_bytes();
        let mut out = String::with_capacity(command.len());
        let mut i = 0;
        while i < command.len() {
            if command[i] == b'G' {
                out.push('G');
                i += 1;
            } else if command[i + 1] == b')' {
                out.push('o');
                i += 2;
            } else {
                out.push_str("al");
                i += 4;
            }
        }
        out
    }
}
