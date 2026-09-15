impl Solution {
    pub fn daily_temperatures(temperatures: Vec<i32>) -> Vec<i32> {
        let n = temperatures.len();
        let mut answer = vec![0i32; n];
        // Stack of days still waiting for a warmer one; their temperatures
        // are non-increasing bottom to top. Unanswered days keep answer 0.
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        for (day, &temp) in temperatures.iter().enumerate() {
            // Strictly warmer today resolves each waiting day on top; equal
            // temperatures leave them waiting (strict < comparison).
            while let Some(&previous) = stack.last() {
                if temperatures[previous] < temp {
                    stack.pop();
                    answer[previous] = (day - previous) as i32;
                } else {
                    break;
                }
            }
            stack.push(day);
        }
        answer
    }
}
