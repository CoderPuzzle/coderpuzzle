impl Solution {
    pub fn min_cost_ii(costs: Vec<Vec<i32>>) -> i32 {
        // Cheapest totals that leave the previous house painted each color,
        // compressed to the smallest, the second smallest, and the color
        // holding the smallest; a color may not extend its own ending.
        let (mut smallest, mut second, mut smallest_color) = (0, 0, usize::MAX);
        for cost in &costs {
            // One pass over the row: every color takes the smallest previous
            // ending unless it IS the smallest's color, when only the second
            // smallest may legally be extended.
            let (mut next_smallest, mut next_second, mut next_color) = (1 << 30, 1 << 30, usize::MAX);
            for (color, &value) in cost.iter().enumerate() {
                let ending = value + if color == smallest_color { second } else { smallest };
                if ending < next_smallest {
                    next_second = next_smallest;
                    next_smallest = ending;
                    next_color = color;
                } else if ending < next_second {
                    next_second = ending;
                }
            }
            smallest = next_smallest;
            second = next_second;
            smallest_color = next_color;
        }
        // The last house may end in any color, and the smallest ending is
        // the cheapest of them.
        smallest
    }
}
