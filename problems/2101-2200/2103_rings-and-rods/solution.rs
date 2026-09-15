impl Solution {
    pub fn count_points(rings: String) -> i32 {
        let bytes = rings.as_bytes();
        let mut masks = [0_u8; 10];
        for index in (0..bytes.len()).step_by(2) {
            let bit = match bytes[index] {
                b'R' => 1,
                b'G' => 2,
                _ => 4,
            };
            masks[(bytes[index + 1] - b'0') as usize] |= bit;
        }
        masks.into_iter().filter(|&mask| mask == 7).count() as i32
    }
}
