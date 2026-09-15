impl Solution {
    pub fn count(num1: String, num2: String, min_sum: i32, max_sum: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let min_sum = min_sum as i64;
        let max_sum = max_sum as i64;
        let a = count_range(&num2, min_sum, max_sum);
        let b = count_range(&decrement(&num1), min_sum, max_sum);
        let res = (((a - b) % MOD) + MOD) % MOD;
        res as i32
    }
}

fn count_range(s: &str, min_sum: i64, max_sum: i64) -> i64 {
    const MOD: i64 = 1_000_000_007;
    let bytes = s.as_bytes();
    let m = bytes.len();
    let ms = max_sum as usize;
    let mut dp = vec![vec![0i64; ms + 1]; 2];
    for sm in 0..=ms {
        let v = if (sm as i64) >= min_sum { 1 } else { 0 };
        dp[0][sm] = v;
        dp[1][sm] = v;
    }
    for pos in (0..m).rev() {
        let d0 = (bytes[pos] - b'0') as usize;
        let mut ndp = vec![vec![0i64; ms + 1]; 2];
        for tight in 0..2usize {
            let limit = if tight == 1 { d0 } else { 9 };
            for sm in 0..=ms {
                let mut total: i64 = 0;
                for d in 0..=limit {
                    let ns = sm + d;
                    if ns > ms {
                        break;
                    }
                    let nt = if tight == 1 && d == limit { 1 } else { 0 };
                    total += dp[nt][ns];
                }
                ndp[tight][sm] = total % MOD;
            }
        }
        dp = ndp;
    }
    dp[1][0]
}

fn decrement(s: &str) -> String {
    let mut arr: Vec<u8> = s.bytes().collect();
    let mut i = arr.len();
    while i > 0 && arr[i - 1] == b'0' {
        arr[i - 1] = b'9';
        i -= 1;
    }
    arr[i - 1] -= 1;
    let mut j = 0;
    while j + 1 < arr.len() && arr[j] == b'0' {
        j += 1;
    }
    String::from_utf8(arr[j..].to_vec()).unwrap()
}
