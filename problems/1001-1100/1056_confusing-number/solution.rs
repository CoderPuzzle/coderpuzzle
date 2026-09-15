impl Solution {
    // Peeling digits off with % 10 / 10 already visits them in the order a
    // 180-degree rotation puts them in (units digit first, so it lands
    // most-significant in the rotated value).
    pub fn confusing_number(n: i32) -> bool {
        let rotate: [i32; 10] = [0, 1, -1, -1, -1, -1, 9, -1, 8, 6];

        let original = n;
        let mut n = n;
        let mut rotated: i64 = 0;
        while n > 0 {
            let digit = (n % 10) as usize;
            if rotate[digit] == -1 {
                return false;
            }
            rotated = rotated * 10 + rotate[digit] as i64;
            n /= 10;
        }
        rotated != original as i64
    }
}
