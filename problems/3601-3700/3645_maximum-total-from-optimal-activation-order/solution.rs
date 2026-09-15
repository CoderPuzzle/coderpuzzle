impl Solution {
    pub fn max_total(value: Vec<i32>, limit: Vec<i32>) -> i64 {
        // A limit-L element can only be taken while fewer than L elements
        // are active, and the moment the count reaches L the rest of its
        // group locks out forever — so each group contributes at most its
        // min(L, m) largest values. Sorting by value descending and capping
        // each group at L picks collects exactly those.
        let mut items: Vec<(i32, i32)> = value.into_iter().zip(limit).collect();
        items.sort_unstable_by(|left, right| right.cmp(left));
        let mut taken = vec![0i64; items.len() + 1];
        let mut total: i64 = 0;
        for (v, l) in items {
            if taken[l as usize] < l as i64 {
                taken[l as usize] += 1;
                total += v as i64;
            }
        }
        total
    }
}
