use std::collections::HashMap;

impl Solution {
    pub fn beautiful_numbers(l: i32, r: i32) -> i32 {
        // Beautiful in [l, r] = count up to r minus count up to l - 1.
        (Self::count_up_to(r as i64) - Self::count_up_to(l as i64 - 1)) as i32
    }

    fn count_up_to(x: i64) -> i64 {
        if x <= 0 {
            return 0;
        }
        let s = x.to_string();
        let digits: Vec<usize> = s.bytes().map(|c| (c - b'0') as usize).collect();
        let mut memo: HashMap<u64, i64> = HashMap::new();
        // Fresh memo per bound: tight transitions depend on x's digits.
        Self::dp(&digits, &mut memo, 0, true, false, 0, 1)
    }

    // State: position, tight (prefix equals x's), started (nonzero seen),
    // running digit sum and digit product — all that beauty depends on.
    fn dp(
        digits: &[usize],
        memo: &mut HashMap<u64, i64>,
        pos: usize,
        tight: bool,
        started: bool,
        ssum: i64,
        prod: i64,
    ) -> i64 {
        if pos == digits.len() {
            // Beautiful iff a number was built and prod is a multiple of the sum;
            // a 0 digit zeroes prod, and 0 is divisible by any positive sum.
            return if started && ssum > 0 && prod % ssum == 0 { 1 } else { 0 };
        }
        let key = pack_key(pos, tight, started, ssum, prod);
        if let Some(&v) = memo.get(&key) {
            return v;
        }
        // A tight prefix is capped at x's digit; free prefixes may take any digit.
        let limit = if tight { digits[pos] } else { 9 };
        let mut res: i64 = 0;
        for d in 0..=limit {
            let nt = tight && (d == limit);
            // Leading zeros contaminate neither the sum nor the product.
            if !started && d == 0 {
                res += Self::dp(digits, memo, pos + 1, nt, false, 0, 1);
            } else {
                res += Self::dp(digits, memo, pos + 1, nt, true, ssum + d as i64, prod * d as i64);
            }
        }
        memo.insert(key, res);
        res
    }
}

fn pack_key(pos: usize, tight: bool, started: bool, ssum: i64, prod: i64) -> u64 {
    // pos <= 9 (4 bits), tight (1), started (1), ssum <= 90 (7 bits), prod <= 9^10 < 2^32
    let t = if tight { 1i64 } else { 0 };
    let st = if started { 1i64 } else { 0 };
    let head = (((pos as i64) * 2 + t) * 2 + st) * 128 + ssum;
    ((head as u64) << 32) + (prod as u64)
}
