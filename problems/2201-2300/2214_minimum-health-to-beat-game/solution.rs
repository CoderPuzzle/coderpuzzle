// Total damage must be survived with health to spare, and the one armor use
// erases min(armor, worst level) of it.
impl Solution {
    pub fn minimum_health(damage: Vec<i32>, armor: i32) -> i64 {
        let (mut total, mut worst) = (0i64, 0i32);
        for &hit in &damage {
            total += hit as i64;
            if hit > worst {
                worst = hit;
            }
        }
        // total reaches 1e10, so the answer is accumulated in 64 bits.
        total + 1 - armor.min(worst) as i64
    }
}
