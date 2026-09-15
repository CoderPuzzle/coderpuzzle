impl Solution {
    // One operation is the linear map (I + S) on the digit vector over
    // Z/10, so after t = n-2 operations digit k is sum_j C(t, j) * d[k+j]
    // mod 10. C(t, j) mod 10 is CRT-assembled from Lucas values mod 2
    // (bit-subset test) and mod 5 (digit products) — no length-10^5
    // Pascal row is ever materialized.
    pub fn has_same_digits(s: String) -> bool {
        let bytes = s.as_bytes();
        let t = bytes.len() as i32 - 2;
        // cm5[a][b] = C(a, b) mod 5 for single base-5 digits
        let mut cm5 = [[0i32; 5]; 5];
        for a in 0..5 {
            cm5[a][0] = 1;
            for b in 1..=a {
                cm5[a][b] = (cm5[a - 1][b - 1] + cm5[a - 1][b]) % 5;
            }
        }
        // crt[r2][r5] = the digit x in 0..9 with x % 2 == r2 and x % 5 == r5
        let mut crt = [[0i32; 5]; 2];
        for x in 0..10 {
            crt[(x % 2) as usize][(x % 5) as usize] = x;
        }
        let (mut a, mut b) = (0i32, 0i32);
        for j in 0..=t {
            // Lucas mod 2: C(t, j) is odd iff every bit of j is a bit of t.
            let r2 = if j & !t == 0 { 1 } else { 0 };
            let (mut r5, mut tj, mut jj) = (1i32, t, j);
            while jj > 0 {
                r5 = r5 * cm5[(tj % 5) as usize][(jj % 5) as usize] % 5;
                tj /= 5;
                jj /= 5;
            }
            let c = crt[r2 as usize][r5 as usize];
            a = (a + c * (bytes[j as usize] - b'0') as i32) % 10;
            b = (b + c * (bytes[(j + 1) as usize] - b'0') as i32) % 10;
        }
        a == b
    }
}
