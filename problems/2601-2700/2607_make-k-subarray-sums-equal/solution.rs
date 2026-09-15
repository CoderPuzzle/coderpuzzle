impl Solution {
    pub fn make_sub_k_sum_equal(arr: Vec<i32>, k: i32) -> i64 {
        fn gcd(a: i64, b: i64) -> i64 {
            let (mut a, mut b) = (a, b);
            while b != 0 {
                let t = a % b;
                a = b;
                b = t;
            }
            a
        }
        let n = arr.len() as i64;
        // Adjacent windows of length k must agree, forcing arr[(i+k) mod n] =
        // arr[i]: stepping by k around the cycle visits exactly one residue
        // class mod g = gcd(n, k), and each class being constant is also
        // sufficient — any window then picks up each class k/g times.
        let g = gcd(n, k as i64) as usize;
        let mut total: i64 = 0;
        for r in 0..g {
            let mut group: Vec<i32> = (r..arr.len()).step_by(g).map(|i| arr[i]).collect();
            group.sort();
            // Unit steps are cheapest around a median; classes are
            // independent, so costs simply add up.
            let median = group[group.len() / 2] as i64;
            for &v in &group {
                total += (v as i64 - median).abs();
            }
        }
        total
    }
}
