impl Solution {
    pub fn min_time(s: String, order: Vec<i32>, k: i32) -> i32 {
        let n = s.len();
        // Once every character is a '*', all n * (n + 1) / 2 substrings are
        // valid; if even that total falls short of k, no time ever works.
        // The total passes 32 bits near n = 10^5, hence the widening.
        let total = n as i64 * (n as i64 + 1) / 2;
        if total < k as i64 {
            return -1;
        }
        // Each replacement only turns more substrings valid, so activity is
        // monotone in t and the earliest active time admits a binary search.
        // Feasibility at t = n - 1 is guaranteed by the early return above.
        let mut lo = 0usize;
        let mut hi = n - 1;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if valid_count(&order, mid, total) >= k as i64 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}

// Number of substrings holding at least one star after the first t + 1
// positions are starred: the total minus what the star-free runs hide, each
// maximal run of length L hiding 1 + 2 + ... + L.
fn valid_count(order: &[i32], t: usize, total: i64) -> i64 {
    let mut starred = vec![false; order.len()];
    for &pos in &order[..=t] {
        starred[pos as usize] = true;
    }
    let mut invalid = 0i64;
    let mut run = 0i64;
    for flag in starred {
        if flag {
            run = 0;
        } else {
            run += 1;
            invalid += run;
        }
    }
    total - invalid
}
