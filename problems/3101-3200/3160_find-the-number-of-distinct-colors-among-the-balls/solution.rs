use std::collections::HashMap;

impl Solution {
    pub fn query_results(limit: i32, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // Two maps carry the whole state: ball -> its current color, and
        // color -> how many balls currently wear it. A query is a pair of
        // counter bumps around a map read, and the size of the live-color
        // map answers the query without ever rescanning the balls.
        let mut ball_color: HashMap<i32, i32> = HashMap::new();
        let mut color_count: HashMap<i32, i32> = HashMap::new();
        let mut result = Vec::with_capacity(queries.len());
        for query in &queries {
            let ball = query[0];
            let color = query[1];
            if let Some(previous) = ball_color.get(&ball).copied() {
                let count = color_count.get_mut(&previous).unwrap();
                *count -= 1;
                // The old color vanishes only when its last ball left.
                if *count == 0 {
                    color_count.remove(&previous);
                }
            }
            *color_count.entry(color).or_insert(0) += 1;
            ball_color.insert(ball, color);
            result.push(color_count.len() as i32);
        }
        result
    }
}
