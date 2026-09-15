// Memoized DFS over the remaining-needs vector. Every state offers the same
// two move kinds: buy one unit of any still-wanted item at its list price,
// or apply any special offer that fits inside the state — the fit check is
// what forbids buying more than wanted.
impl Solution {
    pub fn shopping_offers(price: Vec<i32>, special: Vec<Vec<i32>>, needs: Vec<i32>) -> i32 {
        let n = price.len();
        let mut size = 1usize;
        for _ in 0..n {
            size *= 11;
        }
        let mut memo = vec![-1i32; size];
        let mut cur = needs.clone();
        dfs(&price, &special, &mut memo, &mut cur)
    }
}

fn dfs(price: &[i32], special: &[Vec<i32>], memo: &mut [i32], cur: &mut [i32]) -> i32 {
    let n = price.len();
    // Counts stay at most 10, so cur packs into one base-11 integer.
    let mut key = 0usize;
    let mut empty = true;
    for i in 0..n {
        key = key * 11 + cur[i] as usize;
        if cur[i] > 0 {
            empty = false;
        }
    }
    if empty {
        return 0;
    }
    if memo[key] != -1 {
        return memo[key];
    }
    let mut best = i32::MAX / 2;
    // Move kind 1: one unit of item i, bought individually.
    for i in 0..n {
        if cur[i] > 0 {
            cur[i] -= 1;
            best = best.min(price[i] + dfs(price, special, memo, cur));
            cur[i] += 1;
        }
    }
    // Move kind 2: a special offer, when it fits within cur.
    for offer in special {
        let mut fits = true;
        for j in 0..n {
            if offer[j] > cur[j] {
                fits = false;
                break;
            }
        }
        if fits {
            for j in 0..n {
                cur[j] -= offer[j];
            }
            best = best.min(offer[n] + dfs(price, special, memo, cur));
            for j in 0..n {
                cur[j] += offer[j];
            }
        }
    }
    memo[key] = best;
    best
}
