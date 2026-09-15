impl Solution {
    pub fn count_rectangles(rectangles: Vec<Vec<i32>>, points: Vec<Vec<i32>>) -> Vec<i32> {
        let mut by_height: Vec<Vec<i32>> = vec![Vec::new(); 101];
        for rect in &rectangles {
            by_height[rect[1] as usize].push(rect[0]);
        }
        for lengths in &mut by_height {
            lengths.sort_unstable();
        }

        fn count_at_least(lengths: &[i32], x: i32) -> usize {
            lengths.partition_point(|&l| l < x)
        }

        points
            .iter()
            .map(|point| {
                let (x, y) = (point[0], point[1]);
                let mut total = 0usize;
                for h in (y as usize)..101 {
                    let lengths = &by_height[h];
                    total += lengths.len() - count_at_least(lengths, x);
                }
                total as i32
            })
            .collect()
    }
}
