impl Solution {
    pub fn is_fascinating(n: i32) -> bool {
        let digits = format!("{}{}{}", n, 2 * n, 3 * n);
        if digits.len() != 9 {
            return false;
        }

        let mut seen = [false; 10];
        for character in digits.bytes() {
            let digit = (character - b'0') as usize;
            if digit == 0 || seen[digit] {
                return false;
            }
            seen[digit] = true;
        }
        true
    }
}
