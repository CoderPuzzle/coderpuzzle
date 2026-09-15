impl Solution {
    pub fn digit_frequency_score(mut n: i32) -> i32 {
        let mut answer = 0;
        while n > 0 {
            answer += n % 10;
            n /= 10;
        }
        answer
    }
}
