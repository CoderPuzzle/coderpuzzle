impl Solution {
    pub fn maximum_beauty(mut items: Vec<Vec<i32>>, queries: Vec<i32>) -> Vec<i32> {
        items.sort_unstable_by_key(|item| item[0]);
        let mut prefix_beauty = Vec::with_capacity(items.len());
        let mut best = 0;
        for item in &items {
            best = best.max(item[1]);
            prefix_beauty.push(best);
        }

        queries
            .into_iter()
            .map(|query| {
                let mut low = 0;
                let mut high = items.len();
                while low < high {
                    let middle = low + (high - low) / 2;
                    if items[middle][0] <= query {
                        low = middle + 1;
                    } else {
                        high = middle;
                    }
                }
                if low == 0 {
                    0
                } else {
                    prefix_beauty[low - 1]
                }
            })
            .collect()
    }
}
