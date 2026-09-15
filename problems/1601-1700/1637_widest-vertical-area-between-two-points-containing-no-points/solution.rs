impl Solution {
    pub fn max_width_of_vertical_area(points: Vec<Vec<i32>>) -> i32 {
        let mut xs: Vec<i32> = points.iter().map(|point| point[0]).collect();
        xs.sort();

        xs.windows(2).map(|pair| pair[1] - pair[0]).max().unwrap_or(0)
    }
}
