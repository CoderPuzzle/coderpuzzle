impl Solution {
    pub fn find_column_width(grid: Vec<Vec<i32>>) -> Vec<i32> {
        // Width of a value = digits of its magnitude plus one sign character
        // when negative. Repeated division by 10 counts the digits without
        // materializing strings, and every column keeps a running maximum.
        let mut widths = vec![0i32; grid[0].len()];
        for row in &grid {
            for (column, &value) in row.iter().enumerate() {
                let mut width = if value < 0 { 1 } else { 0 };
                let mut rest = value.abs();
                loop {
                    width += 1;
                    rest /= 10;
                    if rest == 0 {
                        break;
                    }
                }
                widths[column] = widths[column].max(width);
            }
        }
        widths
    }
}
