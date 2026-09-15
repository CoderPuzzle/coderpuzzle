impl Solution {
    pub fn depth_sum_inverse(nested: NestedInteger) -> i32 {
        let mut level: Vec<&NestedInteger> = nested.get_list().iter().collect();
        let mut total = 0;
        let mut flat = 0;
        while !level.is_empty() {
            let mut next_level: Vec<&NestedInteger> = Vec::new();
            let mut level_sum = 0;
            for node in level {
                if node.is_integer() {
                    level_sum += node.get_integer();
                } else {
                    next_level.extend(node.get_list().iter());
                }
            }
            flat += level_sum;
            total += flat;
            level = next_level;
        }
        total
    }
}
