impl Solution {
    pub fn convert_time(current: String, correct: String) -> i32 {
        let parse = |time: &str| -> i32 {
            let bytes = time.as_bytes();
            (bytes[0] - b'0') as i32 * 600
                + (bytes[1] - b'0') as i32 * 60
                + (bytes[3] - b'0') as i32 * 10
                + (bytes[4] - b'0') as i32
        };
        let mut diff = parse(&correct) - parse(&current);
        let mut operations = 0;
        for step in [60, 15, 5, 1] {
            operations += diff / step;
            diff %= step;
        }
        operations
    }
}
