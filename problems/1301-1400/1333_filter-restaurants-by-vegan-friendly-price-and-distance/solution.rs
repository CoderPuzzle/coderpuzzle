impl Solution {
    pub fn filter_restaurants(
        restaurants: Vec<Vec<i32>>,
        vegan_friendly: i32,
        max_price: i32,
        max_distance: i32,
    ) -> Vec<i32> {
        // Inclusive caps; the vegan filter only bites when it is 1. Survivors
        // sort by rating desc, then id desc.
        let mut kept: Vec<Vec<i32>> = restaurants
            .into_iter()
            .filter(|entry| (vegan_friendly == 0 || entry[2] == 1) && entry[3] <= max_price && entry[4] <= max_distance)
            .collect();
        kept.sort_by(|a, b| match b[1].cmp(&a[1]) {
            std::cmp::Ordering::Equal => b[0].cmp(&a[0]),
            order => order,
        });
        kept.iter().map(|entry| entry[0]).collect()
    }
}
