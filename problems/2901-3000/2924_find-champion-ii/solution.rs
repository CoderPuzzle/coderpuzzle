impl Solution {
    // Anyone stronger than team a must end with an edge into a — either
    // directly or through a last hop that is itself an incoming edge —
    // so "no team is stronger than a" is exactly "a has no incoming
    // edge". Count incoming edges, walk the teams in order, and accept
    // only the case where exactly one of them has no incoming edge.
    pub fn find_champion(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut incoming = vec![0i32; n];
        for edge in &edges {
            incoming[edge[1] as usize] += 1;
        }
        let mut champion: i32 = -1;
        for team in 0..n {
            if incoming[team] == 0 {
                if champion != -1 {
                    return -1;
                }
                champion = team as i32;
            }
        }
        champion
    }
}
