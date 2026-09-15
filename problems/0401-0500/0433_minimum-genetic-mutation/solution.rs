impl Solution {
    // BFS over the mutation graph: genes are nodes, edges join genes that
    // differ in exactly one of the 8 characters, and every step after the
    // first must land on a bank entry.
    pub fn min_mutation(startGene: String, endGene: String, bank: Vec<String>) -> i32 {
        // Already there: no character has to change, and no path through
        // the bank can beat zero mutations.
        if startGene == endGene {
            return 0;
        }
        let mut visited = vec![false; bank.len()];
        let mut frontier = vec![startGene.clone()];
        let mut depth = 0;
        while !frontier.is_empty() {
            depth += 1;
            let mut next: Vec<String> = Vec::new();
            for gene in &frontier {
                for (i, candidate) in bank.iter().enumerate() {
                    if visited[i] || differences(gene, candidate) != 1 {
                        continue;
                    }
                    if candidate == &endGene {
                        return depth;
                    }
                    visited[i] = true;
                    next.push(candidate.clone());
                }
            }
            frontier = next;
        }
        -1
    }
}

// Number of positions in which two equal-length genes differ.
fn differences(a: &str, b: &str) -> i32 {
    a.bytes().zip(b.bytes()).map(|(x, y)| if x != y { 1 } else { 0 }).sum()
}
