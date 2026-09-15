use std::collections::HashMap;

impl Solution {
    pub fn kill_process(pid: Vec<i32>, ppid: Vec<i32>, kill: i32) -> Vec<i32> {
        // Killing a process kills its whole subtree, so group the processes
        // by parent — children of one parent keep pid-array order — and walk
        // down from kill. The queue doubles as the answer: every process
        // enters it in exactly the required breadth-first order, so each
        // dequeue is one more confirmed kill.
        let mut children: HashMap<i32, Vec<i32>> = HashMap::new();
        for (child, parent) in pid.into_iter().zip(ppid) {
            children.entry(parent).or_default().push(child);
        }
        let mut killed = vec![kill];
        let mut head = 0;
        while head < killed.len() {
            if let Some(kids) = children.get(&killed[head]) {
                killed.extend_from_slice(kids);
            }
            head += 1;
        }
        killed
    }
}
