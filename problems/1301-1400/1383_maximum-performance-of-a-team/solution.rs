use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn max_performance(n: i32, speed: Vec<i32>, efficiency: Vec<i32>, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let k = k as usize;
        let mut engineers: Vec<(i32, i32)> = (0..n).map(|i| (efficiency[i], speed[i])).collect();
        // Decouple sum(speeds) * min(efficiency) by fixing the minimum:
        // sweep in decreasing efficiency so the current engineer caps the
        // team, and everyone seen so far has efficiency >= theirs.
        engineers.sort_by(|a, b| b.cmp(a));
        let mut heap: BinaryHeap<Reverse<i64>> = BinaryHeap::new();
        let mut speed_sum: i64 = 0;
        let mut best: i64 = 0;
        for &(eff, spd) in &engineers {
            heap.push(Reverse(spd as i64));
            speed_sum += spd as i64;
            // Evict the slowest when over budget, leaving the k fastest
            // among engineers with efficiency >= the current one.
            if heap.len() > k {
                if let Some(Reverse(v)) = heap.pop() {
                    speed_sum -= v;
                }
            }
            // Best performance of any team this engineer caps; the optimal
            // team's bottleneck appears as "current" at some step.
            let perf = speed_sum * eff as i64;
            if perf > best {
                best = perf;
            }
        }
        // Reduce only at the end: the max must be taken on true values.
        (best % MOD) as i32
    }
}
