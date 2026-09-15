impl Solution {
    pub fn number_of_employees_who_met_target(hours: Vec<i32>, target: i32) -> i32 {
        // One pass bumps a counter whenever hours[i] >= target; "at least"
        // makes equal-to-target count, which is what Example 1 pins down.
        let mut met = 0;
        for &worked in &hours {
            if worked >= target {
                met += 1;
            }
        }
        met
    }
}
