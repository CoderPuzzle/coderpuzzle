// Keep the smallest enemy unmarked as a recharge battery: its value m is the
// cheapest point source, and if the initial energy cannot beat even m, no
// first point is possible (marking needs one). Otherwise every other enemy
// gets marked eventually and each lot of m converts to a point, so the
// answer divides initial energy plus all other energies by m. The sum stays
// below 10^5 * 10^9 + 10^9, so accumulate in an i64.
impl Solution {
    pub fn maximum_points(enemy_energies: Vec<i32>, current_energy: i32) -> i64 {
        let mut smallest = enemy_energies[0];
        for &e in &enemy_energies {
            if e < smallest {
                smallest = e;
            }
        }
        if current_energy < smallest {
            return 0;
        }
        let mut total = current_energy as i64;
        for e in enemy_energies {
            total += e as i64;
        }
        (total - smallest as i64) / smallest as i64
    }
}
