use std::collections::HashSet;

impl Solution {
    // Collect distinct substring values (leading zeros vanish on parse),
    // walk them from the largest down, and primality-test each by trial
    // division until three primes have been summed.
    pub fn sum_of_largest_primes(s: String) -> i64 {
        let n = s.len();
        let mut seen: HashSet<i64> = HashSet::new();
        for i in 0..n {
            for j in (i + 1)..=n {
                let v: i64 = s[i..j].parse().unwrap();
                seen.insert(v);
            }
        }
        let mut values: Vec<i64> = seen.into_iter().collect();
        values.sort_unstable_by(|a, b| b.cmp(a));
        let mut total = 0i64;
        let mut found = 0;
        for v in values {
            if is_prime(v) {
                total += v;
                found += 1;
                if found == 3 {
                    break;
                }
            }
        }
        total
    }
}

fn is_prime(v: i64) -> bool {
    if v < 2 {
        return false;
    }
    if v % 2 == 0 {
        return v == 2;
    }
    let mut f = 3i64;
    while f * f <= v {
        if v % f == 0 {
            return false;
        }
        f += 2;
    }
    true
}
