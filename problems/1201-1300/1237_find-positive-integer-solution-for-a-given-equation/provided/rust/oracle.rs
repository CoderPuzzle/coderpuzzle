// Problem-provided oracle (the hidden f(x, y) wire). The wrapper constructs
// the oracle from its tagged case values plus the query budget; values[0]
// is the generic OjValue integer for function_id. Paths stay fully
// qualified — every assembled source shares one module.
pub struct CustomFunction {
    function_id: i32,
    budget: i64,
}

impl CustomFunction {
    pub fn new(values: &[OjValue], budget: i64) -> Self {
        let function_id = match &values[0] {
            OjValue::Int(v) => *v as i32,
            _ => panic!("Oracle function_id must be an integer"),
        };
        CustomFunction { function_id, budget }
    }

    // Returns some positive integer f(x, y) for two positive integers x and
    // y based on a formula. Evaluated in i64 so the largest formula (x^3 +
    // y^3 at the 1000 x 1000 corner, 2e9) stays exact inside i32.
    pub fn f(&mut self, x: i32, y: i32) -> i32 {
        if self.budget <= 0 {
            panic!("Oracle query budget exhausted");
        }
        self.budget -= 1;
        let (a, b) = (i64::from(x), i64::from(y));
        let value = match self.function_id {
            1 => a + b,
            2 => a * b,
            3 => a * a + b,
            4 => a + b * b,
            5 => a * a + b * b,
            6 => 10 * a + b,
            7 => a * a * a + b * b * b,
            8 => (a + b) * (a + b),
            9 => a * b + a + b,
            _ => panic!("Unknown function_id"),
        };
        value as i32
    }
}
