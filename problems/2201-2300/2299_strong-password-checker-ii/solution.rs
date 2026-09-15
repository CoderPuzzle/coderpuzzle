impl Solution {
    pub fn strong_password_checker_ii(password: String) -> bool {
        if password.len() < 8 {
            return false;
        }
        let special = "!@#$%^&*()-+";
        let bytes = password.as_bytes();
        let mut has_lower = false;
        let mut has_upper = false;
        let mut has_digit = false;
        let mut has_special = false;
        for index in 0..bytes.len() {
            let current = bytes[index];
            if index > 0 && current == bytes[index - 1] {
                return false;
            }
            if current.is_ascii_lowercase() {
                has_lower = true;
            } else if current.is_ascii_uppercase() {
                has_upper = true;
            } else if current.is_ascii_digit() {
                has_digit = true;
            } else if special.contains(current as char) {
                has_special = true;
            }
        }
        has_lower && has_upper && has_digit && has_special
    }
}
