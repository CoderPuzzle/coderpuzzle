impl Solution {
    pub fn closest_cost(baseCosts: Vec<i32>, toppingCosts: Vec<i32>, target: i32) -> i32 {
        // Reachable topping totals: start from {0}; each topping price t
        // maps every sum s to s, s + t, s + 2t, kept as a sorted,
        // deduplicated vector. Scanning the totals against every base, the
        // best dessert cost minimizes |b + s - target|, ties broken toward
        // the smaller cost.
        let mut sums = vec![0i32];
        for &t in &toppingCosts {
            let mut next = Vec::with_capacity(sums.len() * 3);
            for &s in &sums {
                next.push(s);
                next.push(s + t);
                next.push(s + 2 * t);
            }
            next.sort_unstable();
            next.dedup();
            sums = next;
        }
        let mut best: Option<i32> = None;
        for &b in &baseCosts {
            for &s in &sums {
                let cost = b + s;
                let take = match best {
                    None => true,
                    Some(x) => {
                        (cost - target).abs() < (x - target).abs()
                            || ((cost - target).abs() == (x - target).abs() && cost < x)
                    }
                };
                if take {
                    best = Some(cost);
                }
            }
        }
        best.unwrap()
    }
}
