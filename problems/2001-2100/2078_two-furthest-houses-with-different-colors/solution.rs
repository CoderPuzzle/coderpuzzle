impl Solution {
    pub fn max_distance(colors: Vec<i32>) -> i32 {
        let last = colors.len() - 1;
        let mut answer = 0;
        for (index, &color) in colors.iter().enumerate() {
            if color != colors[0] {
                answer = answer.max(index);
            }
            if color != colors[last] {
                answer = answer.max(last - index);
            }
        }
        answer as i32
    }
}
