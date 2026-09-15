// Problem-provided oracle (CategoryHandler), Rust side. Assembled into
// every submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the category assignment as a generic
// value plus the query budget; only have_same_category reveals it.
#[allow(dead_code)]
pub struct CategoryHandler {
    category: Vec<i32>,
    budget: i64,
}

impl CategoryHandler {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let items = match construction.first() {
            Some(OjValue::Array(items)) => items.clone(),
            _ => panic!("CategoryHandler categories must be an array"),
        };
        let mut category = Vec::with_capacity(items.len());
        for item in items {
            match item {
                OjValue::Int(v) => category.push(v as i32),
                _ => panic!("CategoryHandler categories must be integers"),
            }
        }
        CategoryHandler { category, budget }
    }

    fn spend(&mut self) {
        if self.budget <= 0 {
            panic!("CategoryHandler query budget exhausted");
        }
        self.budget -= 1;
    }

    // Reports whether elements a and b share a category; out-of-range
    // arguments answer false, per the statement.
    pub fn have_same_category(&mut self, a: i32, b: i32) -> bool {
        self.spend();
        let len = self.category.len() as i32;
        if a < 0 || a >= len || b < 0 || b >= len {
            return false;
        }
        self.category[a as usize] == self.category[b as usize]
    }
}
