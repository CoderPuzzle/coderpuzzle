impl Solution {
    pub fn max_count(banned: Vec<i32>, n: i32, max_sum: i32) -> i32 {
        // Greedy ascending: the cheapest remaining legal integer always
        // leaves at least as much slack as any alternative, so walking
        // 1..n and taking values while the running sum fits is optimal.
        // Bans outside [1, n] are ignored; the sum stays <= max_sum
        // <= 10^9, inside i32 range.
        let mut is_banned = vec![false; (n + 1) as usize];
        for x in banned {
            if x <= n {
                is_banned[x as usize] = true;
            }
        }
        let mut count = 0i32;
        let mut total: i64 = 0;
        for v in 1..=n {
            if is_banned[v as usize] {
                continue;
            }
            if total + v as i64 > max_sum as i64 {
                break;
            }
            total += v as i64;
            count += 1;
        }
        count
    }
}
