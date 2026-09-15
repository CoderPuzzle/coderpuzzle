impl Solution {
    // No waiting means a potion's passage is rigid: once potion j starts at
    // wizard 0 at time s_j, wizard i finishes it at exactly
    // s_j + mana[j] * pref[i], with pref[i] = skill[0] + ... + skill[i-1].
    // Wizard i accepts potion j only after finishing potion j-1, so the
    // earliest feasible starts obey, with prev = mana[j-1], cur = mana[j],
    //   s_j - s_{j-1} = max_i ( prev * skill[i] + (prev - cur) * pref[i] ),
    // and choosing each s_j minimally is globally optimal since every
    // constraint grows monotonically with earlier starts. The maximand is
    // the upper envelope of the lines skill[i] + t * pref[i] queried at
    // t = (prev - cur) / prev; pref is strictly increasing, so the hull
    // builds in one pass and each query binary-searches it with exact
    // integer cross-multiplications. Times reach ~6.25 * 10^14, so every
    // sum and product runs on i64.
    pub fn min_time(skill: Vec<i32>, mana: Vec<i32>) -> i64 {
        let n = skill.len();
        let mut pref = vec![0i64; n + 1];
        for i in 0..n {
            pref[i + 1] = pref[i] + skill[i] as i64;
        }

        let mut hull_s: Vec<i64> = Vec::with_capacity(n);
        let mut hull_p: Vec<i64> = Vec::with_capacity(n);
        for i in 0..n {
            // Pop the top line while it is never strictly above its
            // neighbours: skill >= 1 keeps every slope distinct.
            while hull_p.len() >= 2 {
                let a_s = hull_s[hull_s.len() - 2];
                let b_s = hull_s[hull_s.len() - 1];
                let a_p = hull_p[hull_p.len() - 2];
                let b_p = hull_p[hull_p.len() - 1];
                if (a_s - skill[i] as i64) * (b_p - a_p) <= (a_s - b_s) * (pref[i] - a_p) {
                    hull_s.pop();
                    hull_p.pop();
                } else {
                    break;
                }
            }
            hull_s.push(skill[i] as i64);
            hull_p.push(pref[i]);
        }

        let mut total = 0i64;
        let mut previous = mana[0] as i64;
        for j in 1..mana.len() {
            let current = mana[j] as i64;
            let (p, q) = (previous - current, previous);
            // Line b beats line a at t = p/q iff q*(s_b - s_a) >= p*(p_a - p_b).
            let (mut lo, mut hi) = (0usize, hull_s.len() - 1);
            while lo < hi {
                let mid = (lo + hi) / 2;
                if q * (hull_s[mid + 1] - hull_s[mid]) >= p * (hull_p[mid] - hull_p[mid + 1]) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            total += hull_s[lo] * q + hull_p[lo] * p;
            previous = current;
        }
        total + pref[n] * mana[mana.len() - 1] as i64
    }
}
