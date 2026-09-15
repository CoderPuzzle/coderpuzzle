impl Solution {
    pub fn max_points(technique1: Vec<i32>, technique2: Vec<i32>, k: i32) -> i64 {
        // Start from the best-of-both baseline: each task pays its larger
        // value. Tasks where technique 1 already wins count toward the
        // quota for free; every task where technique 2 wins must pay back
        // its win (technique2[i] - technique1[i]) whenever the free count
        // falls short of k, and paying back the smallest losses first is
        // plainly optimal. No sort of the whole array is needed.
        let mut base = 0i64;
        let mut losses: Vec<i64> = Vec::new();
        let mut free = 0usize;
        for (&a, &b) in technique1.iter().zip(&technique2) {
            if a >= b {
                base += a as i64;
                free += 1;
            } else {
                base += b as i64;
                losses.push(b as i64 - a as i64);
            }
        }
        let forced = k as usize;
        if forced > free {
            losses.sort_unstable();
            base -= losses[..forced - free].iter().sum::<i64>();
        }
        base
    }
}
