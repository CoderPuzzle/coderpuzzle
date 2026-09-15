impl Solution {
    pub fn pour_water(mut heights: Vec<i32>, volume: i32, k: i32) -> Vec<i32> {
        // One droplet at a time, on a surface whose levels are terrain plus
        // already-settled water. A droplet probes left first: walk as far as
        // the non-increasing levels allow; if the walk ends strictly below
        // the landing level at k, the droplet settles on the nearest cell of
        // that lowest stretch (walk back over the equal-level plateau). If
        // left cannot make it fall, probe right the same way. If neither
        // direction can, the droplet rises at k itself.
        let n = heights.len();
        let k = k as usize;
        for _ in 0..volume {
            let mut pos = k;
            while pos > 0 && heights[pos - 1] <= heights[pos] {
                pos -= 1;
            }
            if heights[pos] < heights[k] {
                while heights[pos + 1] == heights[pos] {
                    pos += 1;
                }
                heights[pos] += 1;
                continue;
            }
            let mut pos = k;
            while pos + 1 < n && heights[pos + 1] <= heights[pos] {
                pos += 1;
            }
            if heights[pos] < heights[k] {
                while heights[pos - 1] == heights[pos] {
                    pos -= 1;
                }
                heights[pos] += 1;
                continue;
            }
            heights[k] += 1;
        }
        heights
    }
}
