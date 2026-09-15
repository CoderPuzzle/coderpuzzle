impl Solution {
    pub fn total_waviness(num1: i64, num2: i64) -> i64 {
        // f(N) = total waviness of 1..N; the answer telescopes to
        // f(num2) - f(num1 - 1). Two parallel tables track live prefixes
        // by (started, last digit, second-last digit): "tight" prefixes
        // still equal to N's prefix and "free" prefixes already below it.
        // Digit 10 stands for "no digit yet". Everything accumulates in
        // i64: the largest achievable answer is f(10^15) ~ 7.4e15.
        f(num2) - f(num1 - 1)
    }
}

fn blank() -> [[[i64; 11]; 11]; 2] {
    [[[0; 11]; 11]; 2]
}

fn f(n: i64) -> i64 {
    if n <= 0 {
        return 0;
    }
    let mut digits = [0usize; 16];
    let mut length = 0usize;
    let mut m = n;
    while m > 0 {
        digits[length] = (m % 10) as usize;
        length += 1;
        m /= 10;
    }
    digits[..length].reverse();
    const NONE: usize = 10;

    let mut tight_cnt = blank();
    let mut tight_wav = blank();
    let mut free_cnt = blank();
    let mut free_wav = blank();
    tight_cnt[0][NONE][NONE] = 1;
    for pos in 0..length {
        let mut n_tight_cnt = blank();
        let mut n_tight_wav = blank();
        let mut n_free_cnt = blank();
        let mut n_free_wav = blank();
        for group in 0..2 {
            let tight = group == 0;
            let (cnt, wav, hi) = if tight {
                (&tight_cnt, &tight_wav, digits[pos])
            } else {
                (&free_cnt, &free_wav, 9)
            };
            for s in 0..=1usize {
                for d1 in 0..=NONE {
                    for d2 in 0..=NONE {
                        let count = cnt[s][d1][d2];
                        if count == 0 {
                            continue;
                        }
                        let total = wav[s][d1][d2];
                        for x in 0..=hi {
                            let started = if s == 1 || x != 0 { 1usize } else { 0 };
                            let mut gain = 0i64;
                            let (nd1, nd2);
                            if s == 1 {
                                if d2 != NONE && ((d1 > d2 && d1 > x) || (d1 < d2 && d1 < x)) {
                                    gain = 1;
                                }
                                nd1 = x;
                                nd2 = d1;
                            } else if started == 1 {
                                nd1 = x;
                                nd2 = NONE;
                            } else {
                                nd1 = NONE;
                                nd2 = NONE;
                            }
                            let acc = total + gain * count;
                            if tight && x == hi {
                                n_tight_cnt[started][nd1][nd2] += count;
                                n_tight_wav[started][nd1][nd2] += acc;
                            } else {
                                n_free_cnt[started][nd1][nd2] += count;
                                n_free_wav[started][nd1][nd2] += acc;
                            }
                        }
                    }
                }
            }
        }
        tight_cnt = n_tight_cnt;
        tight_wav = n_tight_wav;
        free_cnt = n_free_cnt;
        free_wav = n_free_wav;
    }
    let mut grand = 0i64;
    for tab in [&tight_wav, &free_wav] {
        for s in 0..=1usize {
            for d1 in 0..=NONE {
                for d2 in 0..=NONE {
                    grand += tab[s][d1][d2];
                }
            }
        }
    }
    grand
}
