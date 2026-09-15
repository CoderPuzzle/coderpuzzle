impl Solution {
    pub fn minimum_chairs(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut people: i32 = 0;
        let mut chairs: i32 = 0;
        for &event in bytes {
            if event == b'E' {
                people += 1;
                chairs = chairs.max(people);
            } else {
                people -= 1;
            }
        }
        chairs
    }
}
