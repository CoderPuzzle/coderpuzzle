impl Solution {
    pub fn fizz_buzz(n: i32) -> Vec<String> {
        let mut answer = Vec::with_capacity(n as usize);
        for i in 1..=n {
            // Each divisor appends its own word, so "FizzBuzz" emerges from
            // both checks passing and an empty build falls back to the
            // number itself — no branch ever enumerates all four cases.
            let mut entry = String::new();
            if i % 3 == 0 {
                entry.push_str("Fizz");
            }
            if i % 5 == 0 {
                entry.push_str("Buzz");
            }
            if entry.is_empty() {
                answer.push(i.to_string());
            } else {
                answer.push(entry);
            }
        }
        answer
    }
}
