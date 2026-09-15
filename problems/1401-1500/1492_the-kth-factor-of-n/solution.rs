impl Solution {
    pub fn kth_factor(n: i32, k: i32) -> i32 {
        let n = n as i64;
        let k = k as usize;
        let mut small: Vec<i64> = Vec::new();
        let mut i = 1i64;
        while i * i <= n {
            if n % i == 0 {
                small.push(i);
                if small.len() == k {
                    return i as i32;
                }
            }
            i += 1;
        }
        let count = small.len() as i64;
        let perfect_square = (i - 1) * (i - 1) == n && n % (i - 1) == 0;
        let total = if perfect_square { 2 * count - 1 } else { 2 * count };
        if (k as i64) > total {
            return -1;
        }
        (n / small[(total - k as i64) as usize]) as i32
    }
}
