use std::collections::HashMap;

impl Solution {
    pub fn process_queries(c: i32, connections: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let c = c as usize;
        // Union-Find assigns every station its fixed grid; an offline
        // station stays in its grid, so connectivity never changes.
        let mut parent: Vec<usize> = (0..=c).collect();
        let mut size = vec![1usize; c + 1];
        fn find(parent: &mut Vec<usize>, x: usize) -> usize {
            let mut x = x;
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }
        for e in &connections {
            let (a, b) = (e[0] as usize, e[1] as usize);
            let (ra, rb) = (find(&mut parent, a), find(&mut parent, b));
            if ra == rb {
                continue;
            }
            let (ra, rb) = if size[ra] < size[rb] { (rb, ra) } else { (ra, rb) };
            parent[rb] = ra;
            size[ra] += size[rb];
        }

        // Group stations by component root, each group sorted ascending.
        let mut groups: HashMap<usize, Vec<usize>> = HashMap::new();
        for x in 1..=c {
            let r = find(&mut parent, x);
            groups.entry(r).or_default().push(x);
        }
        let mut components: Vec<Vec<usize>> = Vec::new();
        let mut comp_of = vec![0usize; c + 1];
        for members in groups.values_mut() {
            members.sort_unstable();
            let ci = components.len();
            for &m in members.iter() {
                comp_of[m] = ci;
            }
            components.push(members.clone());
        }

        let mut online = vec![true; c + 1];
        // ptr[i] is the smallest index into components[i] that is still
        // online; stations only go offline, so it moves monotonically.
        let mut ptr = vec![0usize; components.len()];

        let mut answer = Vec::new();
        for q in &queries {
            let x = q[1] as usize;
            if q[0] == 1 {
                if online[x] {
                    // An online station resolves the check by itself, even
                    // if a smaller station in the same grid is online.
                    answer.push(x as i32);
                } else {
                    let members = &components[comp_of[x]];
                    let p = ptr[comp_of[x]];
                    if p < members.len() {
                        answer.push(members[p] as i32);
                    } else {
                        answer.push(-1);
                    }
                }
            } else if online[x] {
                online[x] = false;
                let ci = comp_of[x];
                let members = &components[ci];
                // Only a hit on the current minimum forces the pointer on.
                if members[ptr[ci]] == x {
                    let mut p = ptr[ci];
                    while p < members.len() && !online[members[p]] {
                        p += 1;
                    }
                    ptr[ci] = p;
                }
            }
        }
        answer
    }
}
