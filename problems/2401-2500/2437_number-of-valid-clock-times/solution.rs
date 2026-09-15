impl Solution {
    pub fn count_time(time: String) -> i32 {
        // Count the valid hours and the valid minutes independently; the
        // two fields never constrain each other, so the answer is their
        // product. A field with no ? has exactly one value if it is itself
        // in range, which the given format guarantees.
        let bytes = time.as_bytes();
        let h_tens = bytes[0];
        let h_ones = bytes[1];
        let m_tens = bytes[3];
        let m_ones = bytes[4];

        let hours = (0..24)
            .filter(|&h| {
                (h_tens == b'?' || h / 10 == (h_tens - b'0') as i32)
                    && (h_ones == b'?' || h % 10 == (h_ones - b'0') as i32)
            })
            .count();

        let minutes = (0..60)
            .filter(|&m| {
                (m_tens == b'?' || m / 10 == (m_tens - b'0') as i32)
                    && (m_ones == b'?' || m % 10 == (m_ones - b'0') as i32)
            })
            .count();

        (hours * minutes) as i32
    }
}
