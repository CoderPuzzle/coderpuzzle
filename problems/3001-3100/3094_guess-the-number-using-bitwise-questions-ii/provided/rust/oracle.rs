// Problem-provided oracle (CommonBits), Rust side. Assembled into every
// submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the initial hidden number as a
// generic value, then the query budget.
#[allow(dead_code)]
pub struct CommonBits {
    n: i32,
    budget: i64,
}

impl CommonBits {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let n = match construction.first() {
            Some(OjValue::Int(n)) => *n as i32,
            _ => panic!("CommonBits n must be an integer"),
        };
        CommonBits { n, budget }
    }

    pub fn common_bits(&mut self, num: i32) -> i32 {
        if self.budget <= 0 {
            panic!("CommonBits query budget exhausted");
        }
        self.budget -= 1;
        let diff = (self.n ^ num) & ((1 << 30) - 1);
        self.n ^= num;
        30 - diff.count_ones() as i32
    }
}
