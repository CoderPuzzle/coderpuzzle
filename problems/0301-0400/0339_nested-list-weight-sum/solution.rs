impl Solution {
    pub fn depth_sum(nested: NestedInteger) -> i32 {
        fn walk(item: &NestedInteger, depth: i32) -> i32 {
            if item.is_integer() {
                return item.get_integer() * depth;
            }
            item.get_list().iter().map(|child| walk(child, depth + 1)).sum()
        }
        nested.get_list().iter().map(|item| walk(item, 1)).sum()
    }
}
