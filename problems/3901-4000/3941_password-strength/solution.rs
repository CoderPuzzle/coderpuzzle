impl Solution {
    pub fn password_strength(password: String) -> i32 {
        let mut lower = [false; 26];
        let mut upper = [false; 26];
        let mut digit = [false; 10];
        let mut special = [false; 4];
        for value in password.bytes() {
            if value.is_ascii_lowercase() {
                lower[(value - b'a') as usize] = true;
            } else if value.is_ascii_uppercase() {
                upper[(value - b'A') as usize] = true;
            } else if value.is_ascii_digit() {
                digit[(value - b'0') as usize] = true;
            } else if let Some(index) = b"!@#$".iter().position(|&candidate| candidate == value) {
                special[index] = true;
            }
        }

        let mut answer = 0;
        for present in lower {
            if present {
                answer += 1;
            }
        }
        for present in upper {
            if present {
                answer += 2;
            }
        }
        for present in digit {
            if present {
                answer += 3;
            }
        }
        for present in special {
            if present {
                answer += 5;
            }
        }
        answer
    }
}
