impl Solution {
    pub fn compress(chars: Vec<String>) -> i32 {
        // Two indexes share one pass: read scans a group of equal
        // characters to its end, write stores the compressed form back
        // into chars itself. A group of k characters compresses to
        // 1 + digits(k) slots — never more than k — so the write frontier
        // always trails the read frontier and overwriting in place is
        // safe. Only the indexes and the run count live outside the
        // array, and the final write index is the compressed length.
        let mut chars = chars;
        let n = chars.len();
        let mut write = 0usize;
        let mut read = 0usize;
        while read < n {
            let ch = chars[read].clone();
            let mut run_end = read;
            while run_end < n && chars[run_end] == ch {
                run_end += 1;
            }
            let count = run_end - read;
            chars[write] = ch;
            write += 1;
            if count > 1 {
                for digit in count.to_string().chars() {
                    chars[write] = digit.to_string();
                    write += 1;
                }
            }
            read = run_end;
        }
        write as i32
    }
}
