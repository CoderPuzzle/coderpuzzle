impl Solution {
    pub fn color_the_array(n: i32, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // Only the painted cell's two neighbor pairs can flip status in
        // one query: score their contribution before the repaint, then
        // after, and slide the running total by the difference. Zero
        // stays "uncolored", so a pair only counts when both sides are
        // non-zero and equal.
        let n = n as usize;
        let mut colors = vec![0i32; n];
        let mut same = 0i32;
        let mut answer = Vec::with_capacity(queries.len());
        for query in queries.iter() {
            let (index, color) = (query[0] as usize, query[1]);
            let old_color = colors[index];
            for (j, against) in [(index.wrapping_sub(1), old_color), (index + 1, old_color)] {
                if j < n && colors[j] != 0 && colors[j] == against {
                    same -= 1;
                }
            }
            colors[index] = color;
            for (j, against) in [(index.wrapping_sub(1), color), (index + 1, color)] {
                if j < n && colors[j] != 0 && colors[j] == against {
                    same += 1;
                }
            }
            answer.push(same);
        }
        answer
    }
}
