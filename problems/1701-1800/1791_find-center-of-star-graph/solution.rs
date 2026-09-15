impl Solution {
    pub fn find_center(edges: Vec<Vec<i32>>) -> i32 {
        // The center lies on every edge, so it is the one node shared by
        // the first two edges; every other node occurs in exactly one edge.
        let a = edges[0][0];
        let b = edges[0][1];
        let c = edges[1][0];
        let d = edges[1][1];
        if a == c || a == d {
            a
        } else {
            b
        }
    }
}
