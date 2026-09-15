impl Solution {
    pub fn shortest_distance_after_queries(n: i32, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // nxt[i] is the next hop from city i on the maintained route. A
        // road (u, v) helps only when u is still on the route and it jumps
        // past nxt[u]; splicing it in retires each leapfrogged city.
        // Retired cities never return, so total work stays linear.
        let n = n as usize;
        let mut nxt: Vec<usize> = (1..n).collect();
        let mut count = n as i32 - 1;
        let mut answer = Vec::with_capacity(queries.len());
        for query in &queries {
            let u = query[0] as usize;
            let v = query[1] as usize;
            let mut j = nxt[u];
            if j > 0 && j < v {
                while j < v {
                    count -= 1;
                    let t = nxt[j];
                    nxt[j] = 0;
                    j = t;
                }
                nxt[u] = v;
            }
            answer.push(count);
        }
        answer
    }
}
