impl Solution {
    pub fn next_beautiful_number(n: i32) -> i32 {
        fn is_balanced(mut value: i32) -> bool {
            let mut counts = [0_i32; 10];
            while value > 0 {
                let digit = (value % 10) as usize;
                if digit == 0 {
                    return false;
                }
                counts[digit] += 1;
                value /= 10;
            }
            (1..10).all(|digit| counts[digit] == 0 || counts[digit] == digit as i32)
        }

        let mut candidate = n + 1;
        loop {
            if is_balanced(candidate) {
                return candidate;
            }
            candidate += 1;
        }
    }
}
