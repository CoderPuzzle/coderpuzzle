impl Solution {
    pub fn minimum_cost(m: i32, n: i32, horizontal_cut: Vec<i32>, vertical_cut: Vec<i32>) -> i32 {
        // A cut costs its base price times the pieces it crosses: one more
        // for every opposite-direction cut already made. An exchange argument
        // (swapping adjacent opposite cuts never helps unless the pricier one
        // goes first) makes "expensive cuts early" the optimal schedule.
        let mut hcuts = horizontal_cut.clone();
        let mut vcuts = vertical_cut.clone();
        hcuts.sort_by(|a, b| b.cmp(a));
        vcuts.sort_by(|a, b| b.cmp(a));
        let (mut i, mut j) = (0usize, 0usize);
        let (mut h_made, mut v_made) = (0i64, 0i64);
        let mut total: i64 = 0;
        // Two-pointer merge: always take the head with the larger base cost,
        // while its multiplier (opposite cuts made + 1) is still small.
        while i < hcuts.len() && j < vcuts.len() {
            // Ties (>=) may go to the horizontal head: equal base costs are
            // interchangeable in the exchange argument.
            if hcuts[i] >= vcuts[j] {
                total += hcuts[i] as i64 * (v_made + 1);
                i += 1;
                h_made += 1;
            } else {
                total += vcuts[j] as i64 * (h_made + 1);
                j += 1;
                v_made += 1;
            }
        }
        // One direction is drained, so the other's multiplier is now fixed.
        while i < hcuts.len() {
            total += hcuts[i] as i64 * (v_made + 1);
            i += 1;
        }
        while j < vcuts.len() {
            total += vcuts[j] as i64 * (h_made + 1);
            j += 1;
        }
        total as i32
    }
}
