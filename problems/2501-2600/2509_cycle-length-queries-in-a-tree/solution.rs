impl Solution {
    pub fn cycle_length_queries(n: i32, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // Adding edge (a, b) closes exactly one cycle: the unique tree path
        // between a and b plus the new edge. Walking the deeper endpoint up
        // one parent (v / 2) at a time until both endpoints meet visits
        // exactly the edges of that path, so the answer is one more than
        // the number of steps taken. Values stay below 2^30, so each walk
        // is at most 30 steps.
        let mut answer = Vec::with_capacity(queries.len());
        for query in &queries {
            let (mut a, mut b) = (query[0], query[1]);
            let mut steps = 1;
            while a != b {
                if a > b {
                    a >>= 1;
                } else {
                    b >>= 1;
                }
                steps += 1;
            }
            answer.push(steps);
        }
        answer
    }
}
