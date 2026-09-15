impl Solution {
    pub fn max_dist_to_closest(seats: Vec<i32>) -> i32 {
        // One pass remembering the previous seated index. The empties
        // before the first person are best entered at seat 0, the empties
        // between two people at the middle of the gap.
        let n = seats.len() as i32;
        let mut prev: i32 = -1;
        let mut best = 0;
        for i in 0..n {
            if seats[i as usize] == 1 {
                if prev < 0 {
                    // Leading empties: seat 0 is distance i from the person.
                    best = i;
                } else {
                    // Between two people: the middle of the gap wins.
                    best = best.max((i - prev) / 2);
                }
                prev = i;
            }
        }
        // Trailing empties: the far end of the row, seat n - 1.
        best.max(n - 1 - prev)
    }
}
