impl Solution {
    pub fn kth_lucky_number(k: i32) -> String {
        // Grow c until the blocks of all lengths up to c cover k: there are
        // 2^len lucky numbers of length len, cumulatively 2^(c + 1) - 2.
        let mut c: u32 = 1;
        while (1i64 << (c + 1)) - 2 < k as i64 {
            c += 1;
        }
        // Rank of k among the c-digit lucky numbers, made zero-based.
        let x = k as i64 - ((1i64 << c) - 2) - 1;
        // Binary counting in order: read x's c bits from the top, mapping
        // 0 -> 4 and 1 -> 7; bit order mirrors digit order, so this
        // enumerates the block exactly as the statement sorts it.
        let mut digits = String::with_capacity(c as usize);
        for bit in (0..c).rev() {
            digits.push(if (x >> bit) & 1 == 1 { '7' } else { '4' });
        }
        digits
    }
}
