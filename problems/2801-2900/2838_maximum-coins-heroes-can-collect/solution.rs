impl Solution {
    pub fn maximum_coins(heroes: Vec<i32>, monsters: Vec<i32>, coins: Vec<i32>) -> Vec<i64> {
        // A hero that beats one monster beats every monster of smaller-or-equal
        // power too, so sorting (power, coin) pairs makes each answer a prefix
        // sum over that order: binary-search how many monsters sit at or below
        // the hero's power and read prefix[k]. Totals reach 10^5 * 10^9 = 10^11,
        // past i32 range, so counts and sums run in i64.
        let mut pairs: Vec<(i32, i64)> = monsters
            .into_iter()
            .zip(coins.into_iter().map(|coin| coin as i64))
            .collect();
        pairs.sort_by_key(|&(power, _)| power);
        let mut prefix = Vec::with_capacity(pairs.len() + 1);
        prefix.push(0i64);
        for &(_, coin) in &pairs {
            let last = prefix[prefix.len() - 1];
            prefix.push(last + coin);
        }
        heroes
            .iter()
            .map(|&hero| {
                let mut lo = 0usize;
                let mut hi = pairs.len();
                while lo < hi {
                    let mid = (lo + hi) / 2;
                    if pairs[mid].0 <= hero {
                        lo = mid + 1;
                    } else {
                        hi = mid;
                    }
                }
                prefix[lo]
            })
            .collect()
    }
}
