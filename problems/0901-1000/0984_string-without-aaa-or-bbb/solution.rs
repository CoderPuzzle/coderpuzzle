// The judge pins one exact answer: call the letter with the larger count
// big ('a' on a tie) and the other small. While big exceeds small and small
// has not run out, append two big letters then one small letter; then, while
// letters remain, append one big letter if any are left, then one small
// letter if any are left.
impl Solution {
    pub fn str_without_3a3b(a: i32, b: i32) -> String {
        let (mut big, mut small) = if a >= b { (a, b) } else { (b, a) };
        let (big_letter, small_letter) = if a >= b { ('a', 'b') } else { ('b', 'a') };
        let mut answer = String::new();
        while big > small && small > 0 {
            answer.push(big_letter);
            answer.push(big_letter);
            answer.push(small_letter);
            big -= 2;
            small -= 1;
        }
        while big > 0 || small > 0 {
            if big > 0 {
                answer.push(big_letter);
                big -= 1;
            }
            if small > 0 {
                answer.push(small_letter);
                small -= 1;
            }
        }
        answer
    }
}
