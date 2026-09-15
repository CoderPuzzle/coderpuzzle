impl Solution {
    pub fn zig_zag_arrays(n: i32, l: i32, r: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let m = (r - l + 1) as usize;
        // up[x] / down[x]: length-i arrays ending at value x whose last step
        // rose / fell. Every single value starts both tables at length 1;
        // the zigzag law then forces each next step to flip direction.
        let mut up = vec![1i64; m];
        let mut down = vec![1i64; m];
        for _ in 1..n {
            // A rising-ending array may only continue onto a smaller value,
            // so new down[y] sums up[x] over x > y -- a running suffix
            // total.
            let mut new_down = vec![0i64; m];
            let mut new_up = vec![0i64; m];
            let mut total = 0i64;
            for y in (0..m).rev() {
                new_down[y] = total;
                total = (total + up[y]) % MOD;
            }
            // Mirror image: new up[y] sums down[x] over x < y.
            total = 0;
            for y in 0..m {
                new_up[y] = total;
                total = (total + down[y]) % MOD;
            }
            up = new_up;
            down = new_down;
        }
        let answer: i64 = up.iter().zip(down.iter()).map(|(&u, &d)| u + d).sum();
        (answer % MOD) as i32
    }
}
