impl Solution {
    pub fn convert(s: String, numRows: i32) -> String {
        let num_rows = numRows as usize;
        // One row never turns (the direction flag below could never flip),
        // and a grid taller than the text is a single pass down: either way
        // the zigzag is the string itself.
        if num_rows == 1 || num_rows >= s.len() {
            return s;
        }
        let mut rows: Vec<String> = vec![String::new(); num_rows];
        // Walk the string once, tracking the current row and direction;
        // reverse exactly at the top and bottom rows, where the zigzag turns.
        let (mut index, mut step) = (0usize, -1isize);
        for ch in s.chars() {
            rows[index].push(ch);
            if index == 0 {
                step = 1;
            } else if index == num_rows - 1 {
                step = -1;
            }
            index = (index as isize + step) as usize;
        }
        // Reading the rows top to bottom is the conversion.
        rows.concat()
    }
}
