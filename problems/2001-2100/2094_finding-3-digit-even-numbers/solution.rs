impl Solution {
    pub fn find_even_numbers(digits: Vec<i32>) -> Vec<i32> {
        let mut available = [0; 10];
        for digit in digits {
            available[digit as usize] += 1;
        }

        let mut answer = Vec::new();
        for number in (100..1000).step_by(2) {
            let mut needed = [0; 10];
            needed[(number / 100) as usize] += 1;
            needed[(number / 10 % 10) as usize] += 1;
            needed[(number % 10) as usize] += 1;
            if (0..10).all(|digit| needed[digit] <= available[digit]) {
                answer.push(number);
            }
        }
        answer
    }
}
