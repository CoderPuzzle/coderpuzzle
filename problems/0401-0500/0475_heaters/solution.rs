impl Solution {
    pub fn find_radius(houses: Vec<i32>, heaters: Vec<i32>) -> i32 {
        // Only the heaters need order: each house binds to its nearest one.
        let mut heaters = heaters;
        heaters.sort();
        let mut radius = 0;
        for &house in &houses {
            // binary_search lands on an exact match (distance 0), or on the
            // insertion point, where the nearest heater neighbours the house.
            if let Err(index) = heaters.binary_search(&house) {
                let nearest = if index == 0 {
                    heaters[index] - house
                } else if index == heaters.len() {
                    house - heaters[index - 1]
                } else {
                    (house - heaters[index - 1]).min(heaters[index] - house)
                };
                radius = radius.max(nearest);
            }
        }
        radius
    }
}
