// The design wrapper's OjFrom table has no Vec<f64> arm yet (the number
// array return of this class); the trait is crate-local, so the bundle
// supplies the conversion here — same wire shape as every other language.
impl OjFrom<Vec<f64>> for OjValue {
    fn oj_from(values: Vec<f64>) -> OjValue {
        OjValue::Array(values.into_iter().map(OjValue::Double).collect())
    }
}

pub struct Solution {
    radius: f64,
    x_center: f64,
    y_center: f64,
    state: u64,
}

impl Solution {
    pub fn new(radius: f64, x_center: f64, y_center: f64) -> Self {
        Solution {
            radius,
            x_center,
            y_center,
            state: 0x9E37_79B9_7F4A_7C15,
        }
    }

    // xorshift64*: the std-free randomness the design probe shape uses,
    // scaled to a uniform double in [0, 1).
    fn next_uniform(&mut self) -> f64 {
        self.state ^= self.state >> 12;
        self.state ^= self.state << 25;
        self.state ^= self.state >> 27;
        let bits = self.state.wrapping_mul(0x2545_F491_4F6C_DD1D) >> 11;
        (bits as f64) * (1.0 / 9007199254740992.0)
    }

    pub fn randPoint(&mut self) -> Vec<f64> {
        loop {
            let dx = (2.0 * self.next_uniform() - 1.0) * self.radius;
            let dy = (2.0 * self.next_uniform() - 1.0) * self.radius;
            if dx * dx + dy * dy <= self.radius * self.radius {
                let half = self.radius * 0.5;
                let i = ((dx / half).floor() as i64 + 2).clamp(0, 3) as i64;
                let j = ((dy / half).floor() as i64 + 2).clamp(0, 3) as i64;
                return vec![
                    self.x_center + (i as f64 - 1.5) * half,
                    self.y_center + (j as f64 - 1.5) * half,
                ];
            }
        }
    }
}
