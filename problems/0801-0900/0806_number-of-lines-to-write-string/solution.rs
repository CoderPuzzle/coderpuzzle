impl Solution {
    pub fn number_of_lines(widths: Vec<i32>, s: String) -> Vec<i32> {
        // Only two numbers matter while the letters are written in order:
        // how wide the line being filled already is, and how many lines
        // have been started. A letter joins the current line when it keeps
        // the total within 100 pixels and opens the next line when it would
        // push past it, so a single left-to-right sweep over s ends holding
        // both answers: the line count and the last line's width.
        let mut lines = 1;
        let mut current = 0;
        for ch in s.bytes() {
            let width = widths[(ch - b'a') as usize];
            if current + width > 100 {
                lines += 1;
                current = width;
            } else {
                current += width;
            }
        }
        vec![lines, current]
    }
}
