impl Solution {
    // Values are states and every operation is a unit-cost edge, so BFS
    // layers count operations. Only +1 ever raises the value, so a
    // target at or above x costs exactly y - x steps; below x, an
    // optimal path never climbs past x + (x - y), which the
    // 1 <= x, y <= 10^4 box keeps under 2 * 10^4.
    pub fn minimum_operations_to_make_equal(x: i32, y: i32) -> i32 {
        let limit = 20010usize;
        let (x, y) = (x as usize, y as usize);
        let mut dist = vec![-1i32; limit + 1];
        dist[x] = 0;
        let mut queue = vec![x];
        let mut head = 0;
        while head < queue.len() {
            let v = queue[head];
            head += 1;
            if v == y {
                return dist[v];
            }
            let mut steps = vec![v + 1];
            if v >= 2 {
                steps.push(v - 1);
            }
            if v % 11 == 0 {
                steps.push(v / 11);
            }
            if v % 5 == 0 {
                steps.push(v / 5);
            }
            for nxt in steps {
                if (1..=limit).contains(&nxt) && dist[nxt] < 0 {
                    dist[nxt] = dist[v] + 1;
                    queue.push(nxt);
                }
            }
        }
        dist[y]
    }
}
