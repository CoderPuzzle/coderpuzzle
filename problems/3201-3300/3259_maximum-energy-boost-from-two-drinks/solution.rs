// A plan that drinks A at hour i either drank A at hour i-1 or drank B at
// hour i-2 and idled through the cleanse hour i-1, so
// dpA[i] = max(dpA[i-1], dpB[i-2]) + energyDrinkA[i] and symmetrically for
// B. Four rolling variables carry the current pair and the one-hour-older
// pair; totals reach 10^10, past the 32-bit range.
impl Solution {
    pub fn max_energy_boost(energy_drink_a: Vec<i32>, energy_drink_b: Vec<i32>) -> i64 {
        let mut a = energy_drink_a[0] as i64 + energy_drink_a[1] as i64;
        let mut b = energy_drink_b[0] as i64 + energy_drink_b[1] as i64;
        let mut old_a = energy_drink_a[0] as i64;
        let mut old_b = energy_drink_b[0] as i64;
        for i in 2..energy_drink_a.len() {
            let next_a = a.max(old_b) + energy_drink_a[i] as i64;
            let next_b = b.max(old_a) + energy_drink_b[i] as i64;
            old_a = a;
            old_b = b;
            a = next_a;
            b = next_b;
        }
        a.max(b)
    }
}
