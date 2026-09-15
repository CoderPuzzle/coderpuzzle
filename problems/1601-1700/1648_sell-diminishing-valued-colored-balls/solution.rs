impl Solution {
    pub fn max_profit(inventory: Vec<i32>, orders: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut inv: Vec<i64> = inventory.iter().map(|&x| x as i64).collect();
        inv.sort_by(|a, b| b.cmp(a));
        inv.push(0); // sentinel

        let mut total: i64 = 0;
        let mut remaining: i64 = orders as i64;
        let mut i: usize = 0;
        let n = inv.len();
        while remaining > 0 && i < n - 1 {
            while i + 1 < n - 1 && inv[i + 1] == inv[i] {
                i += 1;
            }
            let h = inv[i];
            let low = inv[i + 1]; // next distinct level (or 0 sentinel)
            let width = (i + 1) as i64; // colors currently at level h or above
            let band = width * (h - low); // balls in the full band (low, h]
            if remaining >= band {
                // sell every ball valued low+1 .. h for each of the width colors
                total = (total + width * (h + low + 1) * (h - low) / 2) % MOD;
                remaining -= band;
                i += 1;
            } else {
                let full = remaining / width;
                let rem = remaining % width;
                let top = h;
                let bottom = h - full + 1;
                total = (total + width * (top + bottom) * full / 2) % MOD;
                total = (total + rem * (h - full)) % MOD;
                remaining = 0;
            }
        }
        total as i32
    }
}
