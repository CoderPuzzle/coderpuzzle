use std::collections::HashMap;

impl Solution {
    pub fn longest_balanced(s: String) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();
        // Any single character is balanced, so with n >= 1 the answer is at
        // least 1.
        let mut best = 1usize;

        // Case 1 — one distinct letter: balance is vacuous over a run, so
        // track the longest run of equal neighbors.
        let mut run = 1usize;
        for i in 1..n {
            run = if bytes[i] == bytes[i - 1] { run + 1 } else { 1 };
            best = best.max(run);
        }

        // Case 2 — two distinct letters x and y: walk the string ignoring
        // the third letter z, keeping the running difference of their counts.
        // Two positions sharing a difference enclose a stretch that balances
        // the pair. Each z restarts the scan (a window through it would carry
        // a third letter), so first-seen slots carry a version stamp that the
        // split bumps instead of clearing the arrays.
        for x in 0..3usize {
            for y in (x + 1)..3usize {
                let z = (3 - x - y) as isize;
                let mut first = vec![-1isize; 2 * n + 1];
                let mut stamp = vec![-1isize; 2 * n + 1];
                stamp[n] = 0; // difference 0 precedes index 0
                first[n] = -1;
                let (mut version, mut d) = (0isize, 0isize);
                for i in 0..n {
                    let c = (bytes[i] - b'a') as isize;
                    if c == z {
                        version += 1;
                        d = 0;
                        stamp[n] = version;
                        first[n] = i as isize;
                    } else {
                        d += if c == x as isize { 1 } else { -1 };
                        let v = (d + n as isize) as usize;
                        if stamp[v] == version {
                            best = best.max((i as isize - first[v]) as usize);
                        } else {
                            stamp[v] = version;
                            first[v] = i as isize;
                        }
                    }
                }
            }
        }

        // Case 3 — all three letters: hash each prefix's signature
        // (count_b - count_a, count_c - count_a); equal signatures at two
        // prefixes mean the stretch between them changed all three counts by
        // the same amounts. The earliest index per signature maximizes
        // length.
        let width = (2 * n + 1) as i64;
        let mut sigs: HashMap<i64, i64> = HashMap::new();
        sigs.insert((n as i64) * width + n as i64, -1);
        let (mut ca, mut cb, mut cc) = (0i64, 0i64, 0i64);
        for i in 0..n {
            match bytes[i] {
                b'a' => ca += 1,
                b'b' => cb += 1,
                _ => cc += 1,
            }
            let sig = (cb - ca + n as i64) * width + (cc - ca + n as i64);
            match sigs.get(&sig) {
                Some(&j) => best = best.max((i as i64 - j) as usize),
                None => {
                    sigs.insert(sig, i as i64);
                }
            }
        }

        best as i32
    }
}
