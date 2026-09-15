impl Solution {
    pub fn maximum_beauty(mut flowers: Vec<i32>, new_flowers: i64, target: i32, full: i32, partial: i32) -> i64 {
        flowers.sort_unstable();
        let n = flowers.len();
        let target = target as i64;
        let full = full as i64;
        let partial = partial as i64;
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + flowers[i] as i64;
        }

        // Cost to raise every garden among the first m (sorted ascending) up
        // to `level`: only those below `level` need planting.
        let cost_to_level = |m: usize, level: i64| -> i64 {
            let pos = flowers[..m].partition_point(|&count| (count as i64) < level);
            level * pos as i64 - prefix[pos]
        };

        let mut best: i64 = 0;
        let mut budget = new_flowers;
        for complete in 0..=n {
            if complete > 0 {
                let need = (target - flowers[n - complete] as i64).max(0);
                if budget < need {
                    break;
                }
                budget -= need;
            }
            let rest = n - complete;
            if rest == 0 {
                best = best.max(complete as i64 * full);
                break;
            }
            if (flowers[rest - 1] as i64) >= target {
                // every remaining garden is already complete; that split is
                // dominated by completing all of them for free.
                continue;
            }
            // Highest reachable minimum among the remaining gardens.
            let mut low = flowers[0] as i64;
            let mut high = target - 1;
            let mut best_min = low;
            while low <= high {
                let mid = (low + high) / 2;
                if cost_to_level(rest, mid) <= budget {
                    best_min = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            best = best.max(complete as i64 * full + best_min * partial);
        }
        best
    }
}
