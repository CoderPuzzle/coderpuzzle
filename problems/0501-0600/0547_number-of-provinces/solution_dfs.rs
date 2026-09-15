impl Solution {
    pub fn find_circle_num(is_connected: Vec<Vec<i32>>) -> i32 {
        let n = is_connected.len();
        let mut visited = vec![false; n];
        let mut provinces = 0;
        let mut stack: Vec<usize> = Vec::new();
        for start in 0..n {
            if visited[start] {
                continue;
            }
            // An unvisited city during the sweep starts a new component;
            // this one traversal absorbs exactly one province.
            provinces += 1;
            visited[start] = true;
            stack.push(start);
            while let Some(city) = stack.pop() {
                for other in 0..n {
                    if is_connected[city][other] == 1 && !visited[other] {
                        // Mark at push time so no city is stacked twice;
                        // membership is by visitation, so self-loops and the
                        // symmetric matrix never double count.
                        visited[other] = true;
                        stack.push(other);
                    }
                }
            }
        }
        provinces
    }
}
