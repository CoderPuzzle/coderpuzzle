impl Solution {
    // Each pair [a, b] is an edge from a richer person to a poorer one, so the
    // people definitely at least as rich as x are x plus all its ancestors in
    // the DAG. A memoized DFS settles persons from the known-poorest upward:
    // once every direct richer neighbor of x has settled, answer[x] folds in
    // their answers, each of which already covers that neighbor's whole chain.
    pub fn loud_and_rich(richer: Vec<Vec<i32>>, quiet: Vec<i32>) -> Vec<i32> {
        let n = quiet.len();
        let mut richer_of: Vec<Vec<usize>> = vec![Vec::new(); n];
        for pair in &richer {
            let a = pair[0] as usize;
            let b = pair[1] as usize;
            richer_of[b].push(a);
        }
        let mut answer: Vec<i32> = (0..n as i32).collect();
        let mut settled = vec![false; n];
        let mut stack: Vec<(usize, usize)> = Vec::new();
        for start in 0..n {
            if settled[start] {
                continue;
            }
            stack.clear();
            stack.push((start, 0));
            while !stack.is_empty() {
                let len = stack.len();
                let (x, i) = stack[len - 1];
                if i < richer_of[x].len() {
                    stack[len - 1].1 = i + 1;
                    let a = richer_of[x][i];
                    if !settled[a] {
                        stack.push((a, 0));
                    }
                } else {
                    stack.pop();
                    for &a in &richer_of[x] {
                        if quiet[answer[a] as usize] < quiet[answer[x] as usize] {
                            answer[x] = answer[a];
                        }
                    }
                    settled[x] = true;
                }
            }
        }
        answer
    }
}
