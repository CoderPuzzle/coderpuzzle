use std::collections::HashMap;

// Forward DP over prefixes: dp[i] is the minimum cost to assemble
// target[:i], dp[0] is 0, and every reachable position extends each
// DISTINCT word matching its next characters. Duplicate words first
// collapse to their cheapest occurrence. The Easy bounds are small —
// at most 50 words against a target of at most 2000 characters — so
// a direct scan of all words at all positions suffices; greedy
// longest-match fails (a pricey long word can block cheaper short
// ones), and an unreachable dp[n] is the -1 case. The i + len(word)
// <= n bound rejects words longer than the remaining suffix before any
// slice. Costs accumulate in i64 room even though any achievable cost
// is at most len(target) * max(cost) = 2 * 10^8, which fits an i32.
impl Solution {
    pub fn minimum_cost(target: String, words: Vec<String>, costs: Vec<i32>) -> i32 {
        let mut best: HashMap<&str, i64> = HashMap::new();
        for (word, cost) in words.iter().zip(costs.iter()) {
            let c = *cost as i64;
            best.entry(word.as_str())
                .and_modify(|prev| {
                    if c < *prev {
                        *prev = c;
                    }
                })
                .or_insert(c);
        }
        let n = target.len();
        const BIG: i64 = 1i64 << 62;
        let mut dp = vec![BIG; n + 1];
        dp[0] = 0;
        for i in 0..n {
            if dp[i] == BIG {
                continue;
            }
            for (word, c) in best.iter() {
                let j = i + word.len();
                if j > n || dp[i] + *c >= dp[j] {
                    continue;
                }
                if &target[i..j] == *word {
                    dp[j] = dp[i] + *c;
                }
            }
        }
        if dp[n] >= BIG {
            -1
        } else {
            dp[n] as i32
        }
    }
}
