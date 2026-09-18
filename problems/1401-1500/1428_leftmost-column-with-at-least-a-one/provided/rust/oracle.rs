// Problem-provided oracle (BinaryMatrix), Rust side. Assembled into every
// submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the hidden grid rows as generic
// values, then the query budget.
#[allow(dead_code)]
pub struct BinaryMatrix {
    rows: Vec<Vec<i32>>,
    budget: i64,
}

impl BinaryMatrix {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let grid = match construction.first() {
            Some(OjValue::Array(grid)) => grid.clone(),
            _ => panic!("BinaryMatrix rows must be an array"),
        };
        let mut rows = Vec::with_capacity(grid.len());
        for raw in grid {
            let entries = match raw {
                OjValue::Array(entries) => entries,
                _ => panic!("BinaryMatrix rows must be arrays"),
            };
            let mut values = Vec::with_capacity(entries.len());
            for entry in entries {
                match entry {
                    OjValue::Int(v) => values.push(v as i32),
                    _ => panic!("BinaryMatrix entries must be integers"),
                }
            }
            rows.push(values);
        }
        BinaryMatrix { rows, budget }
    }

    pub fn get(&mut self, row: i32, col: i32) -> i32 {
        if self.budget <= 0 {
            panic!("BinaryMatrix query budget exhausted");
        }
        self.budget -= 1;
        self.rows[row as usize][col as usize]
    }

    pub fn dimensions(&mut self) -> Vec<i32> {
        let cols = self.rows.first().map_or(0, |row| row.len() as i32);
        vec![self.rows.len() as i32, cols]
    }
}
