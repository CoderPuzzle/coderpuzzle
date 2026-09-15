use std::collections::BTreeSet;

impl Solution {
    // The only numbers that can qualify are those whose decimal
    // representation uses just {digit1, digit2}; there are at most
    // 2 + 4 + ... + 2^10 = 2046 of them up to 10 digits (11-digit
    // values already exceed 2^31 - 1). Generate every one, sort the
    // list, and scan for the first value that is > k and divisible
    // by k. A number never starts with 0, so seed the generation with
    // the nonzero digits only. Values reach 10^10, so use 64-bit
    // arithmetic until the final 32-bit cast.
    pub fn find_integer(k: i32, digit1: i32, digit2: i32) -> i32 {
        let mut digits: BTreeSet<i64> = BTreeSet::new();
        digits.insert(digit1 as i64);
        digits.insert(digit2 as i64);
        let mut cur: Vec<i64> = digits.iter().copied().filter(|&d| d != 0).collect();
        let mut cands: Vec<i64> = Vec::new();
        for _ in 0..10 {
            cands.extend_from_slice(&cur);
            let mut nxt: Vec<i64> = Vec::new();
            for &v in &cur {
                for &d in &digits {
                    nxt.push(v * 10 + d);
                }
            }
            cur = nxt;
        }
        cands.sort_unstable();
        for v in cands {
            if v > 2147483647 {
                break;
            }
            if v > k as i64 && v % k as i64 == 0 {
                return v as i32;
            }
        }
        -1
    }
}
