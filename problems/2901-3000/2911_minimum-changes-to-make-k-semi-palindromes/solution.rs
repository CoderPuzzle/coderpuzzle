impl Solution {
    pub fn minimum_changes(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();
        // Proper divisors of every length L: 1 <= d < L. A part of length 1
        // has none, so every part of a valid partition has length >= 2.
        let mut divisors: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for d in 1..=(n / 2) {
            let mut length = 2 * d;
            while length <= n {
                divisors[length].push(d);
                length += d;
            }
        }
        const INF: i32 = i32::MAX / 2;
        // cost[i][j]: min letter changes turning s[i..j] into a
        // semi-palindrome, minimized over its proper divisors d. For each d
        // the d repeating-pattern groups must each become a palindrome, and
        // a group costs one change per mismatched mirror pair.
        let mut cost = vec![vec![0i32; n]; n];
        for i in 0..n - 1 {
            for j in i + 1..n {
                let length = j - i + 1;
                let mut best = INF;
                for &d in &divisors[length] {
                    let mut changes = 0;
                    for g in 0..d {
                        let members = (length - 1 - g) / d + 1;
                        let mut a = g;
                        let mut b = g + (members - 1) * d;
                        while a < b {
                            if bytes[i + a] != bytes[i + b] {
                                changes += 1;
                            }
                            a += d;
                            b -= d;
                        }
                    }
                    best = best.min(changes);
                }
                cost[i][j] = best;
            }
        }
        // ways[i] for the current part count p: min changes splitting the
        // suffix s[i:] into p semi-palindrome parts. Transition: pick the
        // first part s[i..x] and add the (p - 1)-part cost of s[x + 1:].
        let mut cur: Vec<i32> = (0..n).map(|i| cost[i][n - 1]).collect();
        let mut prev = vec![0i32; n];
        for parts in 2..=k as usize {
            std::mem::swap(&mut cur, &mut prev);
            cur.iter_mut().for_each(|v| *v = INF);
            // First part s[i..x] needs x - i + 1 >= 2 and the remaining
            // suffix needs length >= 2 * (parts - 1): x <= n - 2*parts + 1.
            let last_start = n + 1 - 2 * parts;
            for i in 0..last_start {
                let mut best = INF;
                for x in i + 1..=last_start {
                    best = best.min(cost[i][x] + prev[x + 1]);
                }
                cur[i] = best;
            }
        }
        cur[0]
    }
}
