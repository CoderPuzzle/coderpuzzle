impl Solution {
    pub fn max_satisfaction(mut satisfaction: Vec<i32>) -> i32 {
        // Sort ascending; the chosen set is a suffix of this order. Adding
        // a new value at the front shifts every chosen dish one slot later
        // (gaining running_sum) and contributes value * 1 for its own slot,
        // so the net change is value + running_sum.
        satisfaction.sort_unstable();
        let mut total = 0;
        let mut running_sum = 0;
        for i in (0..satisfaction.len()).rev() {
            if running_sum + satisfaction[i] > 0 {
                running_sum += satisfaction[i];
                total += running_sum;
            }
        }
        total
    }
}
