impl Solution {
    pub fn button_with_longest_time(events: Vec<Vec<i32>>) -> i32 {
        // Press i takes time_i - time_{i-1} (its own time_i for the first
        // press). Keep the best press seen so far, replacing it on a
        // strictly longer time, or on an equal time from a smaller button
        // index — the statement's tie rule.
        let mut best_index = events[0][0];
        let mut best_taken = events[0][1];
        for i in 1..events.len() {
            let index = events[i][0];
            let taken = events[i][1] - events[i - 1][1];
            if taken > best_taken || (taken == best_taken && index < best_index) {
                best_index = index;
                best_taken = taken;
            }
        }
        best_index
    }
}
