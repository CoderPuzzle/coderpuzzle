use std::collections::HashMap;

// A hash map from cell reference to its current value. Unset cells simply
// read as 0 through a defaulting lookup, and resetCell writes 0 rather
// than deleting, so every cell state lives in one place. getValue drops
// the leading '=', splits on '+', and classifies each operand by its
// first character: a capital letter means a cell reference, anything else
// is a non-negative integer literal.
pub struct Spreadsheet {
    values: HashMap<String, i32>,
}

impl Spreadsheet {
    pub fn new(rows: i32) -> Self {
        Spreadsheet { values: HashMap::new() }
    }

    pub fn setCell(&mut self, cell: String, value: i32) {
        self.values.insert(cell, value);
    }

    pub fn resetCell(&mut self, cell: String) {
        self.values.insert(cell, 0);
    }

    pub fn getValue(&mut self, formula: String) -> i32 {
        let mut total = 0;
        for operand in formula[1..].split('+') {
            if operand.starts_with(|c: char| c.is_ascii_uppercase()) {
                total += self.values.get(operand).copied().unwrap_or(0);
            } else {
                total += operand.parse::<i32>().unwrap();
            }
        }
        total
    }
}
