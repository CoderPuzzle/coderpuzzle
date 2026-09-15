impl Solution {
    pub fn nth_person_gets_nth_seat(n: i32) -> f64 {
        // The floating claim ends by taking seat 1 or seat n, each equally
        // likely; the last passenger wins exactly when seat 1 goes first.
        if n == 1 {
            1.0
        } else {
            0.5
        }
    }
}
