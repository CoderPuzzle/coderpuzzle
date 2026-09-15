impl Solution {
    pub fn clumsy(n: i32) -> i32 {
        // The rotation is *, /, +, - repeating. * and / bind tighter, so they
        // only ever fold into the term on top of the stack; + and - always
        // start a fresh term (pushed with its own sign already applied).
        let mut stack: Vec<i32> = vec![n];
        let mut op_idx = 0;
        for i in (1..n).rev() {
            let op = op_idx % 4;
            op_idx += 1;
            let last = stack.len() - 1;
            match op {
                0 => stack[last] *= i,
                1 => {
                    // Rust's / already truncates toward zero, which is
                    // exactly what a prior '-' push carrying its sign into
                    // this division needs: no separate floor-vs-truncate
                    // handling required.
                    stack[last] /= i;
                }
                2 => stack.push(i),
                _ => stack.push(-i),
            }
        }
        stack.iter().sum()
    }
}
