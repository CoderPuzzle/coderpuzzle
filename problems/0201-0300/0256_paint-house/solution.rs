impl Solution {
    pub fn min_cost(costs: Vec<Vec<i32>>) -> i32 {
        // Cheapest totals that leave house i red, blue, or green; a color
        // may not extend its own ending, which is the adjacency rule.
        let (mut red, mut blue, mut green) = (costs[0][0], costs[0][1], costs[0][2]);
        for cost in &costs[1..] {
            // Each next ending is computed from the previous ones before
            // any variable is overwritten.
            let next_red = cost[0] + blue.min(green);
            let next_blue = cost[1] + red.min(green);
            let next_green = cost[2] + red.min(blue);
            red = next_red;
            blue = next_blue;
            green = next_green;
        }
        // The last house may end in any color, so the answer is the
        // cheapest of the three surviving endings.
        red.min(blue.min(green))
    }
}
