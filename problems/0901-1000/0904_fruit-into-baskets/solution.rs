use std::collections::HashMap;

impl Solution {
    pub fn total_fruit(fruits: Vec<i32>) -> i32 {
        // The rules ask for the longest stretch of trees holding at most two
        // fruit types: two baskets, one type each, one fruit from every tree
        // picked while moving right. A sliding window over a type->count map
        // maintains exactly that — extend the right edge tree by tree, and
        // whenever a third type enters, retire trees from the left until one
        // type's count reaches zero and drops out. The window then always
        // spans the longest legal picking trip ending at the current tree, so
        // its length contests the answer at every step.
        let mut count: HashMap<i32, i32> = HashMap::new();
        let mut best = 0i32;
        let mut left = 0usize;
        for right in 0..fruits.len() {
            *count.entry(fruits[right]).or_insert(0) += 1;
            while count.len() > 2 {
                let fruit = fruits[left];
                let remaining = count[&fruit] - 1;
                if remaining == 0 {
                    count.remove(&fruit);
                } else {
                    count.insert(fruit, remaining);
                }
                left += 1;
            }
            best = best.max((right - left + 1) as i32);
        }
        best
    }
}
