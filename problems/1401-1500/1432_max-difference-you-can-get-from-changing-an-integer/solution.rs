impl Solution {
    pub fn max_diff(num: i32) -> i32 {
        let s = num.to_string();

        // Maximum: rewrite the first non-9 digit (and its duplicates) to 9.
        let mut big = s.clone();
        for digit in s.chars() {
            if digit != '9' {
                big = s.replace(digit, "9");
                break;
            }
        }

        // Minimum: the leading digit goes to 1 when it can, otherwise the
        // first digit > 1 anywhere after goes to 0.
        let mut small = s.clone();
        if !s.starts_with('1') {
            let head = s.chars().next().unwrap();
            small = s.replace(head, "1");
        } else {
            for digit in s.chars() {
                if digit != '0' && digit != '1' {
                    small = s.replace(digit, "0");
                    break;
                }
            }
        }

        big.parse::<i32>().unwrap() - small.parse::<i32>().unwrap()
    }
}
