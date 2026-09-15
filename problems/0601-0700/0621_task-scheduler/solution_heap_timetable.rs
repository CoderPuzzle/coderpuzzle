impl Solution {
    pub fn least_interval(tasks: Vec<String>, n: i32) -> i32 {
        let mut counts: std::collections::HashMap<&str, i32> = std::collections::HashMap::new();
        for t in &tasks {
            *counts.entry(t.as_str()).or_insert(0) += 1;
        }
        // Max-heap of remaining counts for labels free to run right now; only
        // the counts matter, because the cooldown rule treats every label
        // alike.
        let mut ready: std::collections::BinaryHeap<i32> = counts.values().copied().collect();
        // FIFO of runs still cooling: (slot when the label may run again,
        // count left). Free slots arrive in order, so the front pops first.
        let mut cooling: std::collections::VecDeque<(i32, i32)> = std::collections::VecDeque::new();
        let mut time = 0i32;
        while !ready.is_empty() || !cooling.is_empty() {
            // Release everything whose cooldown has expired by now.
            while let Some(&(free, count)) = cooling.front() {
                if free <= time {
                    ready.push(count);
                    cooling.pop_front();
                } else {
                    break;
                }
            }
            if ready.is_empty() {
                // Nothing can run: jump the clock straight to the next
                // release instead of counting idle slots one by one.
                time = cooling[0].0;
                continue;
            }
            // Run one job of the largest remaining count.
            let top = ready.pop().unwrap();
            if top > 1 {
                cooling.push_back((time + n + 1, top - 1));
            }
            time += 1;
        }
        time
    }
}
