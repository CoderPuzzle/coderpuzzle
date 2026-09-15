impl Solution {
    pub fn total_score(hp: i32, damage: Vec<i32>, requirement: Vec<i32>) -> i64 {
        // pref[i] = total damage of rooms 1..i (pref[0] = 0). Starting at
        // room a+1, room b (b >= a+1) pays a point iff
        // hp - (pref[b] - pref[a]) >= requirement[b], i.e.
        // pref[a] >= requirement[b] - hp + pref[b]. Over all n(n+1)/2
        // subarrays this is a dominance count, done per b with a Fenwick
        // tree over compressed prefix sums holding pref[0..b-1]; failing
        // pairs (pref[a] < threshold) are subtracted from the total. Prefix
        // sums reach 1e9 and the answer n(n+1)/2 ~ 5e9, so i64 is used.
        let n = damage.len();
        let mut pref = vec![0_i64; n + 1];
        for i in 0..n {
            pref[i + 1] = pref[i] + damage[i] as i64;
        }
        let mut values = pref.clone();
        values.sort_unstable();
        values.dedup();
        let m = values.len();
        let mut bit = vec![0_i32; m + 1];
        let lower = |x: i64| -> usize {
            let (mut lo, mut hi) = (0, m);
            while lo < hi {
                let mid = (lo + hi) / 2;
                if values[mid] < x {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            lo
        };
        Self::add(&mut bit, lower(pref[0]));
        let mut failing = 0_i64;
        for b in 1..=n {
            let threshold = requirement[b - 1] as i64 - hp as i64 + pref[b];
            // Number of inserted pref[a] with pref[a] < threshold.
            failing += Self::prefix(&bit, lower(threshold));
            Self::add(&mut bit, lower(pref[b]));
        }
        (n * (n + 1) / 2) as i64 - failing
    }

    fn add(bit: &mut [i32], pos: usize) {
        let mut i = pos + 1;
        while i < bit.len() {
            bit[i] += 1;
            i += i & i.wrapping_neg();
        }
    }

    fn prefix(bit: &[i32], pos: usize) -> i64 {
        let mut total = 0_i64;
        let mut i = pos;
        while i > 0 {
            total += bit[i] as i64;
            i -= i & i.wrapping_neg();
        }
        total
    }
}
