impl Solution {
    // Both criteria are about totals the record reveals day by day — how
    // many absences have piled up, and how long the current streak of
    // consecutive lates has grown — so one sweep decides everything.
    pub fn check_record(s: String) -> bool {
        let (mut absents, mut lates) = (0usize, 0usize);
        for &day in s.as_bytes() {
            if day == b'A' {
                absents += 1;
                // An absent day is not a late day, so it also ends any
                // running streak of consecutive lates.
                lates = 0;
            } else if day == b'L' {
                lates += 1;
            } else {
                lates = 0;
            }
            // Fail the moment either criterion is breached — no later day
            // can repair a second absence or a third consecutive late.
            if absents >= 2 || lates >= 3 {
                return false;
            }
        }
        true
    }
}
