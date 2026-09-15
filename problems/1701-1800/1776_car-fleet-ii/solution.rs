impl Solution {
    pub fn get_collision_times(cars: Vec<Vec<i32>>) -> Vec<f64> {
        let n = cars.len();
        let mut answer = vec![-1.0f64; n];
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        // Right-to-left scan; the stack holds cars still free-wheeling, the
        // possible first collisions for everything to their left.
        for i in (0..n).rev() {
            let position = cars[i][0];
            let speed = cars[i][1];
            // A car at least as fast ahead can never be caught — pop it.
            while let Some(&top) = stack.last() {
                if speed <= cars[top][1] {
                    stack.pop();
                } else {
                    break;
                }
            }
            while let Some(&j) = stack.last() {
                // When i would reach j, assuming j keeps its speed.
                let t = (cars[j][0] - position) as f64 / (speed - cars[j][1]) as f64;
                // If j merges earlier, it has slowed before i arrives: it is
                // no first collision for i (nor for anyone further left), so
                // pop permanently and try the next candidate.
                if answer[j] > 0.0 && t >= answer[j] {
                    stack.pop();
                } else {
                    answer[i] = t;
                    break;
                }
            }
            stack.push(i);
        }
        answer
    }
}
