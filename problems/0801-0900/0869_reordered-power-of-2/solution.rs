impl Solution {
    pub fn reordered_power_of_2(n: i32) -> bool {
        // Reordering only permutes digits, so the answer is an inventory
        // match: count how many of each digit 0..9 n holds, then walk the
        // powers of two up to the bound n <= 10^9 admits — 2^0 through
        // 2^29 = 536870912 — and compare inventories. A match is always
        // reachable: the power itself is one of the legal reorderings.
        let mut counts = [0; 10];
        let mut m = n;
        while m > 0 {
            counts[(m % 10) as usize] += 1;
            m /= 10;
        }
        let mut p = 1i64;
        while p <= 1_000_000_000 {
            let mut power_counts = [0; 10];
            let mut m = p;
            while m > 0 {
                power_counts[(m % 10) as usize] += 1;
                m /= 10;
            }
            if power_counts == counts {
                return true;
            }
            p *= 2;
        }
        false
    }
}
