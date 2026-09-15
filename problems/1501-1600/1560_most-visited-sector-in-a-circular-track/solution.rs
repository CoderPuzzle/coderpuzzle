impl Solution {
    pub fn most_visited(n: i32, rounds: Vec<i32>) -> Vec<i32> {
        // Only the first and last sectors of the whole marathon matter: every
        // full lap around the track visits every sector once, so the total
        // visit count only differs on the final, partial lap. That partial
        // lap is exactly the arc from rounds[0] to the last element.
        let start = rounds[0];
        let end = *rounds.last().unwrap();
        if start <= end {
            return (start..=end).collect();
        }
        // The arc wraps past sector n back to sector 1.
        (1..=end).chain(start..=n).collect()
    }
}
