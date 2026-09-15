impl Solution {
    pub fn check_perfect_number(num: i32) -> bool {
        // Proper divisors pair around the square root: whenever i divides num,
        // so does num / i, and one of the pair never exceeds sqrt(num). Seed
        // the total with 1 — the partner of the excluded num itself — then add
        // both members on each clean division below the root. num stays under
        // 1e8, so i tops out at 1e4 and i * i fits an i32, while the total
        // rides in an i64 with room to spare.
        if num <= 1 {
            return false;
        }
        let mut total: i64 = 1;
        let mut i = 2;
        while i * i <= num {
            if num % i == 0 {
                total += i as i64;
                // A candidate sitting exactly on the root is its own partner.
                if i != num / i {
                    total += (num / i) as i64;
                }
            }
            i += 1;
        }
        total == num as i64
    }
}
