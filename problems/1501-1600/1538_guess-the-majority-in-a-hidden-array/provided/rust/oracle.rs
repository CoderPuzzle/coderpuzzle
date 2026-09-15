// Problem-provided oracle (ArrayReader), Rust side. Assembled into
// every submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the hidden binary array as a generic
// value. The oracle enforces the problem's own 2n query budget itself,
// independent of whatever budget the harness supplies.
#[allow(dead_code)]
pub struct ArrayReader {
    nums: Vec<i32>,
    budget: i64,
}

impl ArrayReader {
    pub fn new(construction: &[OjValue], _budget: i64) -> Self {
        let items = match construction.first() {
            Some(OjValue::Array(items)) => items.clone(),
            _ => panic!("ArrayReader values must be an array"),
        };
        let mut nums = Vec::with_capacity(items.len());
        for item in items {
            match item {
                OjValue::Int(v) => nums.push(v as i32),
                _ => panic!("ArrayReader values must be integers"),
            }
        }
        let budget = 2 * nums.len() as i64;
        ArrayReader { nums, budget }
    }

    pub fn query(&mut self, a: i32, b: i32, c: i32, d: i32) -> i32 {
        if self.budget <= 0 {
            panic!("ArrayReader query budget exhausted");
        }
        self.budget -= 1;
        let ones = self.nums[a as usize] + self.nums[b as usize] + self.nums[c as usize] + self.nums[d as usize];
        if ones == 0 || ones == 4 {
            4
        } else if ones == 1 || ones == 3 {
            2
        } else {
            0
        }
    }

    pub fn length(&self) -> i32 {
        self.nums.len() as i32
    }
}
