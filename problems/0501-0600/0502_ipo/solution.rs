impl Solution {
    pub fn find_maximized_capital(k: i32, w: i32, profits: Vec<i32>, capital: Vec<i32>) -> i32 {
        let mut projects: Vec<(i64, i64)> = capital
            .iter()
            .zip(profits.iter())
            .map(|(&c, &p)| (c as i64, p as i64))
            .collect();
        projects.sort_unstable();
        // Greedy: each round finish the affordable project with the largest
        // profit — finishing only adds capital, so the affordable set never
        // shrinks and no smaller-profit pick can unlock more later.
        let mut affordable = std::collections::BinaryHeap::new();
        let n = projects.len();
        let mut current = w as i64;
        let mut index = 0usize;
        // At most min(k, n) picks: only n distinct projects exist.
        let limit = (k as i64).min(n as i64);
        for _ in 0..limit {
            // Sweep every newly affordable project into the heap once; a
            // project affordable now stays affordable forever.
            while index < n && projects[index].0 <= current {
                affordable.push(projects[index].1);
                index += 1;
            }
            // Heap empty: capital is too low to start anything left.
            match affordable.pop() {
                Some(p) => current += p,
                None => break,
            }
        }
        current as i32
    }
}
