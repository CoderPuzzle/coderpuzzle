use std::collections::HashMap;

impl Solution {
    pub fn count_trapezoids(points: Vec<Vec<i32>>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // A horizontal trapezoid is exactly: two points on one horizontal
        // line and two on another. Count each line's pairs, then combine.
        let mut rows: HashMap<i32, i64> = HashMap::new();
        for p in &points {
            *rows.entry(p[1]).or_insert(0) += 1;
        }
        // Per-line pair counts s = C(c, 2) reach ~5e9, past i32 range,
        // and the pair products range far past 64 bits — reduce modulo
        // the prime as every value is produced.
        let mut total = 0i64;
        let mut squared = 0i64;
        for count in rows.values() {
            let pairs = count * (count - 1) / 2 % MOD;
            total = (total + pairs) % MOD;
            squared = (squared + pairs * pairs) % MOD;
        }
        // The sum over line pairs s_i * s_j equals (total^2 - squared)/2;
        // dividing by 2 becomes multiplying by the inverse of 2.
        let inv2 = (MOD + 1) / 2;
        ((((total * total - squared + MOD) % MOD) * inv2) % MOD) as i32
    }
}
