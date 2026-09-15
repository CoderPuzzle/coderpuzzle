// Cell values beside per-cell formula lists, both plain grids: set()
// writes the literal and empties the cell's formula list; sum() installs
// the flattened reference list parsed from numbers; get() resolves on
// demand, recursing through formula cells so a later set() on a source
// cell is picked up by the next get() of anything downstream.
pub struct Excel {
    values: Vec<Vec<i32>>,
    formulas: Vec<Vec<Vec<(usize, usize)>>>,
}

impl Excel {
    pub fn new(height: i32, width: String) -> Self {
        let columns = (width.as_bytes()[0] - b'A') as usize + 1;
        Excel {
            values: vec![vec![0; columns]; height as usize + 1],
            formulas: vec![vec![Vec::new(); columns]; height as usize + 1],
        }
    }

    pub fn set(&mut self, row: i32, column: String, val: i32) {
        let row = row as usize;
        let col = (column.as_bytes()[0] - b'A') as usize;
        self.values[row][col] = val;
        self.formulas[row][col].clear();
    }

    pub fn get(&mut self, row: i32, column: String) -> i32 {
        self.value(row as usize, (column.as_bytes()[0] - b'A') as usize)
    }

    pub fn sum(&mut self, row: i32, column: String, numbers: Vec<String>) -> i32 {
        let target_row = row as usize;
        let target_col = (column.as_bytes()[0] - b'A') as usize;
        let mut references: Vec<(usize, usize)> = Vec::new();
        for number in &numbers {
            let ends: Vec<&str> = number.split(':').collect();
            let first = Excel::cell(ends[0]);
            if ends.len() == 1 {
                references.push(first);
                continue;
            }
            let last = Excel::cell(ends[1]);
            for r in first.0..=last.0 {
                for c in first.1..=last.1 {
                    references.push((r, c));
                }
            }
        }
        self.formulas[target_row][target_col] = references;
        self.value(target_row, target_col)
    }

    // A cell token is one column letter followed by the row number.
    fn cell(token: &str) -> (usize, usize) {
        (
            token[1..].parse::<usize>().expect("cell row"),
            (token.as_bytes()[0] - b'A') as usize,
        )
    }

    fn value(&self, row: usize, col: usize) -> i32 {
        let references = &self.formulas[row][col];
        if references.is_empty() {
            return self.values[row][col];
        }
        // Recursing into each reference is the whole update story: no
        // propagation, no cache, the chain recomputed on every get.
        references.iter().map(|&(r, c)| self.value(r, c)).sum()
    }
}
