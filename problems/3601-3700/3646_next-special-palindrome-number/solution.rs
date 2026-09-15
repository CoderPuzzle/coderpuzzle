impl Solution {
    pub fn special_palindrome(n: i64) -> i64 {
        // A palindrome carries at most one digit an odd number of times, so
        // a digit set works only with at most one odd member; any set whose
        // digits sum past 16 makes palindromes of 17+ digits, beyond every
        // answer reachable from n <= 10^15.
        let limit: i64 = 4_000_000_000_000_000;
        let mut answer = limit;
        for mask in 1..512 {
            let mut digits: Vec<i32> = Vec::new();
            let (mut odds, mut total) = (0, 0);
            for d in 1..=9 {
                if mask >> (d - 1) & 1 == 1 {
                    digits.push(d);
                    odds += d & 1;
                    total += d;
                }
            }
            if odds > 1 || total > 16 {
                continue;
            }
            // Each member k lays k / 2 copies into each half (built ascending,
            // since digits are); a lone odd member also takes the middle.
            let mut mid = 0i32;
            let mut half: Vec<i32> = Vec::new();
            for d in digits {
                if d & 1 == 1 {
                    mid = d;
                }
                for _ in 0..d / 2 {
                    half.push(d);
                }
            }
            // Mirroring preserves order, so lexicographic halves enumerate
            // this set's palindromes in increasing numeric order.
            loop {
                let mut pal: i64 = 0;
                for &d in &half {
                    pal = pal * 10 + d as i64;
                }
                if mid > 0 {
                    pal = pal * 10 + mid as i64;
                }
                for &d in half.iter().rev() {
                    pal = pal * 10 + d as i64;
                }
                if pal > limit {
                    break; // later halves only mirror to larger numbers
                }
                if pal > n {
                    answer = answer.min(pal);
                    break; // first past n is this set's best
                }
                if !next_permutation(&mut half) {
                    break;
                }
            }
        }
        answer
    }
}

fn next_permutation(a: &mut [i32]) -> bool {
    // Advance a multiset to its next distinct permutation in place; false
    // once it has reached the last (descending) arrangement.
    let len = a.len();
    if len < 2 {
        return false;
    }
    let mut i = len - 1;
    while i > 0 && a[i - 1] >= a[i] {
        i -= 1;
    }
    if i == 0 {
        return false;
    }
    let mut j = len - 1;
    while a[j] <= a[i - 1] {
        j -= 1;
    }
    a.swap(i - 1, j);
    a[i..].reverse();
    true
}
