impl Solution {
    // Only the last two surviving digits decide divisibility by 25:
    // the kept number is special exactly when its final pair reads
    // 00, 25, 50, or 75 — or when nothing survives, since both the
    // empty result and a lone '0' equal 0. Pick positions i < j for
    // that closing pair: every digit before i may be retained free
    // of charge because it never moves the mod-25 outcome, so the
    // bill is the j - i - 1 digits wedged between the pair plus the
    // n - 1 - j digits after it, totaling n - i - 2 — smallest when
    // i sits as far right as possible. Taking each ending's
    // rightmost second-digit slot j and then the nearest matching
    // first digit strictly left of j already maximizes i: every
    // candidate first digit lies left of that slot or the pair is
    // impossible. Fallbacks: retaining one lone '0' costs n - 1,
    // and wiping all digits costs n. With at most 100 digits the
    // counts are tiny.
    pub fn minimum_operations(num: String) -> i32 {
        let bytes = num.as_bytes();
        let n = bytes.len() as i32;
        let mut best = if bytes.contains(&b'0') { n - 1 } else { n };
        let heads = [b'0', b'2', b'5', b'7'];
        let tails = [b'0', b'5', b'0', b'5'];
        for t in 0..4 {
            let mut j: i32 = -1;
            let mut k = n - 1;
            while k >= 1 {
                if bytes[k as usize] == tails[t] {
                    j = k;
                    break;
                }
                k -= 1;
            }
            if j < 0 {
                continue;
            }
            let mut i: i32 = -1;
            let mut k = j - 1;
            while k >= 0 {
                if bytes[k as usize] == heads[t] {
                    i = k;
                    break;
                }
                k -= 1;
            }
            if i >= 0 && n - i - 2 < best {
                best = n - i - 2;
            }
        }
        best
    }
}
