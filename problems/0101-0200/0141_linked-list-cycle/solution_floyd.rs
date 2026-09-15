impl Solution {
    pub fn has_cycle(values: Vec<i32>, pos: i32) -> bool {
        if values.is_empty() {
            // Empty input is acyclic by convention.
            return false;
        }
        // Materialize the wire form with indices as links: NIL stands for a
        // null successor, otherwise next[i] gives node i's successor.
        const NIL: usize = usize::MAX;
        let mut next = vec![NIL; values.len()];
        for i in 0..values.len() - 1 {
            next[i] = i + 1;
        }
        // Point the tail back at index pos to close the cycle.
        if pos != -1 {
            next[values.len() - 1] = pos as usize;
        }
        // Floyd's tortoise and hare: slow advances one node per step, fast two.
        let mut slow = 0usize;
        let mut fast = 0usize;
        loop {
            let step1 = next[fast];
            if step1 == NIL {
                // fast ran past the end of the list: no cycle.
                return false;
            }
            let step2 = next[step1];
            if step2 == NIL {
                return false;
            }
            slow = next[slow];
            fast = step2;
            // fast gains one node per lap on slow, so inside a cycle it must
            // catch slow within a single lap: meeting proves the cycle.
            if slow == fast {
                return true;
            }
        }
    }
}
