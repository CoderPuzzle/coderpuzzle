impl Solution {
    // Each pair [a, b] is an edge from a richer person to a poorer one, so the
    // people definitely at least as rich as x are x plus all its ancestors in
    // the DAG. A Kahn sweep settles persons from the known-richest downward:
    // once every richer neighbor of b has relaxed its answer into b, answer[b]
    // holds the least quiet person among them all.
    pub fn loud_and_rich(richer: Vec<Vec<i32>>, quiet: Vec<i32>) -> Vec<i32> {
        let n = quiet.len();
        let mut poorer: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut pending = vec![0usize; n];
        for pair in &richer {
            let a = pair[0] as usize;
            let b = pair[1] as usize;
            poorer[a].push(b);
            pending[b] += 1;
        }
        let mut answer: Vec<i32> = (0..n as i32).collect();
        let mut settled: Vec<usize> = (0..n).filter(|&x| pending[x] == 0).collect();
        let mut i = 0;
        while i < settled.len() {
            let x = settled[i];
            i += 1;
            for &b in &poorer[x] {
                if quiet[answer[x] as usize] < quiet[answer[b] as usize] {
                    answer[b] = answer[x];
                }
                pending[b] -= 1;
                if pending[b] == 0 {
                    settled.push(b);
                }
            }
        }
        answer
    }
}
