// Problem-provided oracle (InfiniteStream), Rust side. Assembled into every
// submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the recorded bit prefix as generic
// values, then the query budget.
#[allow(dead_code)]
pub struct InfiniteStream {
    bits: Vec<i32>,
    position: usize,
    budget: i64,
}

impl InfiniteStream {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let items = match construction.first() {
            Some(OjValue::Array(items)) => items.clone(),
            _ => panic!("InfiniteStream bits must be an array"),
        };
        let mut bits = Vec::with_capacity(items.len());
        for item in items {
            match item {
                OjValue::Int(v) => bits.push(v as i32),
                _ => panic!("InfiniteStream bits must be integers"),
            }
        }
        InfiniteStream {
            bits,
            position: 0,
            budget,
        }
    }

    pub fn next(&mut self) -> i32 {
        if self.budget <= 0 {
            panic!("InfiniteStream query budget exhausted");
        }
        self.budget -= 1;
        let value = self.bits[self.position];
        self.position += 1;
        value
    }
}
