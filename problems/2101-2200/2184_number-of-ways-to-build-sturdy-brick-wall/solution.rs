impl Solution {
    pub fn build_wall(height: i32, width: i32, bricks: Vec<i32>) -> i32 {
        // A row is fully described by its internal-joint bitmask; adjacent
        // rows must be disjoint. Enumerate row masks once, then run one
        // count-map transition per row.
        const MOD: i64 = 1_000_000_007;
        let mut masks: Vec<i32> = Vec::new();
        fn rec(position: i32, width: i32, bricks: &[i32], mask: i32, masks: &mut Vec<i32>) {
            if position == width {
                masks.push(mask);
                return;
            }
            for brick in bricks {
                if position + brick > width {
                    continue;
                }
                let next = position + brick;
                let extra = if next < width { 1 << (next - 1) } else { 0 };
                rec(next, width, bricks, mask | extra, masks);
            }
        }
        rec(0, width, &bricks, 0, &mut masks);
        if masks.is_empty() {
            return 0;
        }
        use std::collections::HashMap;
        let mut counts: HashMap<i32, i64> = masks.iter().map(|&m| (m, 1i64)).collect();
        for _row in 1..height {
            let mut next_counts: HashMap<i32, i64> = HashMap::new();
            for &below in &masks {
                let mut total = 0i64;
                for &above in &masks {
                    if above & below == 0 {
                        total += counts[&above];
                    }
                }
                next_counts.insert(below, total % MOD);
            }
            counts = next_counts;
        }
        let mut answer = 0i64;
        for value in counts.values() {
            answer = (answer + value) % MOD;
        }
        answer as i32
    }
}
