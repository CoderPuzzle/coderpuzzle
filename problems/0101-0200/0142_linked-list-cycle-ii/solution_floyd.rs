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
        // Phase 1: Floyd's tortoise and hare; fast falling off the end (NIL)
        // means no cycle.
        let mut slow = 0usize;
        let mut fast = 0usize;
        loop {
            let step1 = next[fast];
            if step1 == NIL {
                return -1;
            }
            let step2 = next[step1];
            if step2 == NIL {
                return -1;
            }
            slow = next[slow];
            fast = step2;
            if slow == fast {
                // Phase 2: with a = head-to-entry, b = entry-to-meeting and
                // c = the rest of the loop, a + 2b + c = 2(a + b) gives c = a,
                // so a finder restarted at the head and slow continuing from
                // the meeting point converge after exactly a steps — on the
                // entry node.
                let mut finder = 0usize;
                while finder != slow {
                    finder = next[finder];
                    slow = next[slow];
                }
                // Indices as links make the entry node its own answer index.
                return finder as i32;
            }
        }
    }
}
