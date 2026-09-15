impl Solution {
    pub fn max_abs_val_expr(arr1: Vec<i32>, arr2: Vec<i32>) -> i32 {
        // |A|+|B|+|C| = max over sign triples of s1*A + s2*B + s3*C, so the
        // best pair distance is the widest span of one of 8 projections.
        let mut best = i32::MIN;
        for s1 in [1i32, -1] {
            for s2 in [1i32, -1] {
                for s3 in [1i32, -1] {
                    let mut high = s1 * arr1[0] + s2 * arr2[0];
                    let mut low = high;
                    for (k, (&a, &b)) in arr1.iter().zip(arr2.iter()).enumerate() {
                        let value = s1 * a + s2 * b + s3 * k as i32;
                        if value > high {
                            high = value;
                        } else if value < low {
                            low = value;
                        }
                    }
                    best = best.max(high - low);
                }
            }
        }
        best
    }
}
