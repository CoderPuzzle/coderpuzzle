// Appends the inclusive pieces of [lo1, hi1] that avoid [lo2, hi2] to the
// output vectors; at most two pieces ever fit.
fn add_pieces<const N: usize>(
    lo1: i32,
    hi1: i32,
    lo2: i32,
    hi2: i32,
    lo_out: &mut [i32; N],
    hi_out: &mut [i32; N],
    mut count: usize,
) -> usize {
    if lo1 > hi1 {
        return count;
    }
    if hi2 < lo1 || lo2 > hi1 {
        lo_out[count] = lo1;
        hi_out[count] = hi1;
        count += 1;
    } else {
        if lo1 < lo2 {
            lo_out[count] = lo1;
            hi_out[count] = lo2 - 1;
            count += 1;
        }
        if hi2 < hi1 {
            lo_out[count] = hi2 + 1;
            hi_out[count] = hi1;
            count += 1;
        }
    }
    count
}

impl Solution {
    pub fn can_make_palindrome_queries(s: String, queries: Vec<Vec<i32>>) -> Vec<bool> {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let half = n / 2;
        // prefix[i + 1][k] = occurrences of b'a' + k in s[0..i]
        let mut prefix = vec![[0_i32; 26]; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i];
            prefix[i + 1][(bytes[i] - b'a') as usize] += 1;
        }
        // mismatch[i + 1] = pairs (x, n-1-x), x <= i, whose characters
        // differ — pairs a query repairs only by covering x or its mirror
        // on its side.
        let mut mismatch = vec![0_i32; half + 1];
        for x in 0..half {
            mismatch[x + 1] = mismatch[x] + i32::from(bytes[x] != bytes[n - 1 - x]);
        }

        let mut answer = Vec::with_capacity(queries.len());
        let mut fixed_lo = [0_i32; 4];
        let mut fixed_hi = [0_i32; 4]; // fully fixed left-half ranges
        let mut fl_lo = [0_i32; 2];
        let mut fl_hi = [0_i32; 2]; // fixed characters facing [c, d]
        let mut fr_lo = [0_i32; 2];
        let mut fr_hi = [0_i32; 2]; // fixed characters facing [a, b]
        for query in &queries {
            let (a, b, c, d) = (query[0], query[1], query[2], query[3]);
            let (m1, m2) = ((n as i32 - 1 - b) as usize, (n as i32 - 1 - a) as usize); // mirror of [a, b]
            let (f1, f2) = ((n as i32 - 1 - d) as usize, (n as i32 - 1 - c) as usize); // mirror of [c, d]
                                                                                       // Pairs covered on neither side must already match.
            let mut count = add_pieces(0, a - 1, f1 as i32, f2 as i32, &mut fixed_lo, &mut fixed_hi, 0);
            count = add_pieces(
                b + 1,
                half as i32 - 1,
                f1 as i32,
                f2 as i32,
                &mut fixed_lo,
                &mut fixed_hi,
                count,
            );
            let mut bad = 0_i32;
            for i in 0..count {
                bad += mismatch[(fixed_hi[i] + 1) as usize] - mismatch[fixed_lo[i] as usize];
            }
            if bad > 0 {
                answer.push(false);
                continue;
            }
            // Pool balance per letter: A + F_L == B + F_R with A covering F_R.
            let fl_count = add_pieces(f1 as i32, f2 as i32, a, b, &mut fl_lo, &mut fl_hi, 0);
            let fr_count = add_pieces(m1 as i32, m2 as i32, c, d, &mut fr_lo, &mut fr_hi, 0);
            let mut ok = true;
            for k in 0..26 {
                let pool_a = prefix[b as usize + 1][k] - prefix[a as usize][k];
                let pool_b = prefix[d as usize + 1][k] - prefix[c as usize][k];
                let (mut left, mut right, mut fixed_r) = (pool_a, pool_b, 0_i32);
                for i in 0..fl_count {
                    left += prefix[(fl_hi[i] + 1) as usize][k] - prefix[fl_lo[i] as usize][k];
                }
                for i in 0..fr_count {
                    let piece = prefix[(fr_hi[i] + 1) as usize][k] - prefix[fr_lo[i] as usize][k];
                    right += piece;
                    fixed_r += piece;
                }
                if left != right || pool_a < fixed_r {
                    ok = false;
                    break;
                }
            }
            answer.push(ok);
        }
        answer
    }
}
