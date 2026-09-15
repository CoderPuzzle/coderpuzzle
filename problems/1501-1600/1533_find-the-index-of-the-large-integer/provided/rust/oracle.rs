// Problem-provided oracle (ArrayReader), Rust side. Assembled into
// every submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the hidden array as a generic
// value, then the query budget.
#[allow(dead_code)]
pub struct ArrayReader {
    values: Vec<i64>,
    budget: i64,
}

impl ArrayReader {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let raw = match construction.first() {
            Some(OjValue::Array(values)) => values.clone(),
            _ => panic!("ArrayReader arr must be an array"),
        };
        let mut values = Vec::with_capacity(raw.len());
        for entry in raw {
            match entry {
                OjValue::Int(v) => values.push(v),
                _ => panic!("ArrayReader entries must be integers"),
            }
        }
        ArrayReader { values, budget }
    }

    pub fn compare_sub(&mut self, l: i32, r: i32, x: i32, y: i32) -> i32 {
        if self.budget <= 0 {
            panic!("ArrayReader query budget exhausted");
        }
        self.budget -= 1;
        let mut left: i64 = 0;
        for i in l..=r {
            left += self.values[i as usize];
        }
        let mut right: i64 = 0;
        for i in x..=y {
            right += self.values[i as usize];
        }
        if left > right {
            1
        } else if left < right {
            -1
        } else {
            0
        }
    }

    pub fn length(&self) -> i32 {
        self.values.len() as i32
    }
}
