impl Solution {
    pub fn delete_and_earn(nums: Vec<i32>) -> i32 {
        // Deleting one copy of v removes its neighbors for free, so a strategy
        // just picks distinct values, earning v * count[v] each — house-robber
        // over the sorted distinct values (BTreeMap iterates in order).
        let mut count: std::collections::BTreeMap<i32, i64> = std::collections::BTreeMap::new();
        for &v in &nums {
            *count.entry(v).or_insert(0) += 1;
        }
        let mut take: i64 = 0;
        let mut skip: i64 = 0;
        let mut prev: Option<i32> = None;
        for (&value, &c) in &count {
            // Adjacent predecessor conflicts with its take; a gap (missing v-1)
            // makes taking v conflict with nothing, so both states carry in.
            let base = if prev == Some(value - 1) { skip } else { take.max(skip) };
            let new_take = base + value as i64 * c;
            let new_skip = take.max(skip);
            take = new_take;
            skip = new_skip;
            prev = Some(value);
        }
        take.max(skip) as i32
    }
}
