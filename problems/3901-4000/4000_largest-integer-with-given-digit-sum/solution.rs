impl Solution {
    pub fn largest_integer(n: i32, mut s: i32) -> i32 {
        if s > 9 * n {
            return -1;
        }
        if s == 0 {
            return 0;
        }
        let mut answer = 0;
        for _ in 0..n {
            let digit = s.min(9);
            answer = answer * 10 + digit;
            s -= digit;
        }
        answer
    }
}
