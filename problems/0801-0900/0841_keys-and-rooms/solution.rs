impl Solution {
    // Rooms are nodes and keys are one-way edges, so the rooms that can ever
    // be entered are exactly those reachable from room 0. An explicit stack
    // floods the key graph; the answer compares marked rooms to n.
    pub fn can_visit_all_rooms(rooms: Vec<Vec<i32>>) -> bool {
        let mut seen = vec![false; rooms.len()];
        seen[0] = true;
        let mut stack: Vec<usize> = vec![0];
        let mut visited = 1;
        while let Some(room) = stack.pop() {
            for &key in &rooms[room] {
                let next = key as usize;
                if seen[next] {
                    continue;
                }
                seen[next] = true;
                visited += 1;
                stack.push(next);
            }
        }
        visited == rooms.len()
    }
}
