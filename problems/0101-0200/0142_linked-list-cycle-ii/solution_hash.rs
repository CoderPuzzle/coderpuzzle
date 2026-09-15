use std::collections::HashSet;

impl Solution {
    pub fn detect_cycle(values: Vec<i32>, pos: i32) -> i32 {
        if values.is_empty() {
            return -1;
        }
        // Materialize the wire form with indices as links: NIL stands for a
        // null successor, otherwise next[i] gives node i's successor.
        const NIL: usize = usize::MAX;
        let mut next = vec![NIL; values.len()];
        for i in 0..values.len() - 1 {
            next[i] = i + 1;
        }
        if pos != -1 {
            next[values.len() - 1] = pos as usize;
        }
        // Walk from node 0 remembering every index seen. The first node to
        // come around a second time is the cycle's entry; insert() reports
        // false exactly when it does. Running into NIL instead means no
        // cycle.
        let mut seen: HashSet<usize> = HashSet::new();
        let mut node = 0usize;
        while node != NIL {
            if !seen.insert(node) {
                // Indices as links make the entry node its own answer index.
                return node as i32;
            }
            node = next[node];
        }
        -1
    }
}
