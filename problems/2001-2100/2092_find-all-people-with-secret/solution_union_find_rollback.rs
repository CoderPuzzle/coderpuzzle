impl Solution {
    pub fn find_all_people(n: i32, mut meetings: Vec<Vec<i32>>, first_person: i32) -> Vec<i32> {
        // Path-halving: splice every other node directly under its
        // grandparent, flattening the tree while walking to the root.
        fn find(parent: &mut [usize], mut x: usize) -> usize {
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }
        let n = n as usize;
        let mut parent: Vec<usize> = (0..n).collect();
        // Moment 0: person 0 hands the whisper to first_person, so the two
        // share a component while everybody else is still a singleton.
        parent[0] = first_person as usize;
        meetings.sort_unstable_by_key(|meeting| meeting[2]);
        let mut start = 0;
        while start < meetings.len() {
            let mut end = start;
            while end < meetings.len() && meetings[end][2] == meetings[start][2] {
                let ra = find(&mut parent, meetings[end][0] as usize);
                let rb = find(&mut parent, meetings[end][1] as usize);
                if ra != rb {
                    parent[ra] = rb;
                }
                end += 1;
            }

            // Roll back every attendee this moment left uninformed: their
            // merges must not leak the whisper into a later moment.
            let root = find(&mut parent, 0);
            for index in start..end {
                let x = meetings[index][0] as usize;
                let y = meetings[index][1] as usize;
                if find(&mut parent, x) != root {
                    parent[x] = x;
                }
                if find(&mut parent, y) != root {
                    parent[y] = y;
                }
            }
            start = end;
        }

        let root = find(&mut parent, 0);
        (0..n)
            .filter(|&person| find(&mut parent, person) == root)
            .map(|person| person as i32)
            .collect()
    }
}
