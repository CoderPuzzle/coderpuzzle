impl Solution {
    pub fn number_of_categories(category_handler: &mut CategoryHandler, n: i32) -> i32 {
        // Keep one representative index per category discovered so far.
        // Same-category is an equivalence relation behind the oracle, so
        // by transitivity element i shares a category with some earlier
        // element exactly when it shares one with that category's
        // representative: scanning representatives only never misses a
        // join and never invents one. A miss across all representatives
        // means i opens a genuinely new category and becomes its
        // representative; at most i queries are spent on element i, so
        // the whole sweep stays within n(n-1)/2 calls.
        let mut representatives: Vec<i32> = Vec::with_capacity(n as usize);
        for i in 0..n {
            let mut joined = false;
            for &rep in &representatives {
                if category_handler.have_same_category(i, rep) {
                    joined = true;
                    break;
                }
            }
            if !joined {
                representatives.push(i);
            }
        }
        representatives.len() as i32
    }
}
