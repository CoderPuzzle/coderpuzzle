// Problem-provided oracle (MountainArray), Rust side. Assembled into
// every submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the sequence's values as generic
// values, then the query budget.
#[allow(dead_code)]
pub struct MountainArray {
    values: Vec<i32>,
    budget: i64,
}

impl MountainArray {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let items = match construction.first() {
            Some(OjValue::Array(items)) => items.clone(),
            _ => panic!("MountainArray values must be an array"),
        };
        let mut values = Vec::with_capacity(items.len());
        for item in items {
            match item {
                OjValue::Int(v) => values.push(v as i32),
                _ => panic!("MountainArray values must be integers"),
            }
        }
        MountainArray { values, budget }
    }

    pub fn get(&mut self, index: i32) -> i32 {
        if self.budget <= 0 {
            panic!("MountainArray query budget exhausted");
        }
        self.budget -= 1;
        if index < 0 || (index as usize) >= self.values.len() {
            panic!("MountainArray index out of range");
        }
        self.values[index as usize]
    }

    pub fn length(&self) -> i32 {
        self.values.len() as i32
    }
}
