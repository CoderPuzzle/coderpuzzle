impl Solution {
    pub fn count_arrangement(n: i32) -> i32 {
        // candidates[p]: the values position p admits — the divisors of p
        // and the multiples of p up to n, the only values that can satisfy
        // either divisibility condition at that position.
        let n = n as usize;
        let mut candidates = vec![Vec::new(); n + 1];
        for p in 1..=n {
            for v in 1..=n {
                if v % p == 0 || p % v == 0 {
                    candidates[p].push(v);
                }
            }
        }
        let mut used = vec![false; n + 1];
        fill(1, n, &candidates, &mut used) as i32
    }
}

// Every position holds a value: one complete beautiful arrangement.
fn fill(pos: usize, n: usize, candidates: &[Vec<usize>], used: &mut [bool]) -> usize {
    if pos > n {
        return 1;
    }
    let mut total = 0;
    for &v in &candidates[pos] {
        if !used[v] {
            used[v] = true;
            total += fill(pos + 1, n, candidates, used);
            used[v] = false;
        }
    }
    total
}
