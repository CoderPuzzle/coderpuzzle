// dp(i, budget) is the shortest encoding of s[i:] using at most `budget`
// more deletions. Memoized on (i, budget), both bounded by n.
impl Solution {
    pub fn get_length_of_optimal_compression(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let k = k as usize;
        let mut memo = vec![vec![-1i32; k + 1]; n + 1];
        dp(bytes, &mut memo, 0, k)
    }
}

fn calc_len(count: i32) -> i32 {
    if count == 0 {
        0
    } else if count == 1 {
        1
    } else if count < 10 {
        2
    } else if count < 100 {
        3
    } else {
        4
    }
}

fn dp(bytes: &[u8], memo: &mut Vec<Vec<i32>>, i: usize, budget: usize) -> i32 {
    let n = bytes.len();
    if n - i <= budget {
        // Every remaining character can simply be deleted.
        return 0;
    }
    if memo[i][budget] != -1 {
        return memo[i][budget];
    }
    // Delete bytes[i] outright and move on.
    let mut best = if budget > 0 {
        dp(bytes, memo, i + 1, budget - 1)
    } else {
        i32::MAX
    };
    // Or keep a run of bytes[i]'s character: scan forward, paying one
    // deletion for every mismatched character folded into the run.
    let mut same: i32 = 0;
    let mut diff: usize = 0;
    for j in i..n {
        if bytes[j] == bytes[i] {
            same += 1;
        } else {
            diff += 1;
            if diff > budget {
                break;
            }
        }
        best = best.min(calc_len(same) + dp(bytes, memo, j + 1, budget - diff));
    }
    memo[i][budget] = best;
    best
}
