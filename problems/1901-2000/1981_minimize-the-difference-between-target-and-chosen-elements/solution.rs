impl Solution {
    pub fn minimize_the_difference(mat: Vec<Vec<i32>>, target: i32) -> i32 {
        // Reachable sums as a boolean table: sum s is reachable after the
        // rows processed so far. The largest possible total bounds the table.
        let max_sum = mat.iter().map(|row| row.iter().max().unwrap()).sum::<i32>() as usize;
        let mut reachable = vec![false; max_sum + 1];
        reachable[0] = true;
        for row in &mat {
            let mut next = vec![false; max_sum + 1];
            for (s, &ok) in reachable.iter().enumerate() {
                if !ok {
                    continue;
                }
                for &value in row {
                    if s + value as usize <= max_sum {
                        next[s + value as usize] = true;
                    }
                }
            }
            reachable = next;
        }
        // Closest set slot below target, then the smallest one above it.
        let target = target as usize;
        let mut best: Option<usize> = None;
        for s in (0..=target.min(max_sum)).rev() {
            if reachable[s] {
                best = Some(target - s);
                break;
            }
        }
        for s in (target + 1)..=max_sum {
            if reachable[s] {
                let gap = s - target;
                if best.map_or(true, |b| gap < b) {
                    best = Some(gap);
                }
                break;
            }
        }
        best.unwrap() as i32
    }
}
