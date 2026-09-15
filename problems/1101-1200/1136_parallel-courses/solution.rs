use std::collections::VecDeque;

impl Solution {
    pub fn minimum_semesters(n: i32, relations: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        let mut indegree = vec![0i32; n + 1];
        for relation in &relations {
            let prev = relation[0] as usize;
            let nxt = relation[1] as usize;
            adjacency[prev].push(nxt);
            indegree[nxt] += 1;
        }
        // semester 1: every course with no prerequisites
        let mut queue: VecDeque<usize> = VecDeque::new();
        for i in 1..=n {
            if indegree[i] == 0 {
                queue.push_back(i);
            }
        }
        let mut semesters = 0;
        let mut taken = 0usize;
        while !queue.is_empty() {
            semesters += 1;
            // drain the entire current level as one semester; the answer is
            // the longest prerequisite chain, one level per semester
            for _ in 0..queue.len() {
                let course = queue.pop_front().unwrap();
                taken += 1;
                for &nxt in &adjacency[course] {
                    indegree[nxt] -= 1;
                    // prerequisite count hits zero: ready for next semester
                    if indegree[nxt] == 0 {
                        queue.push_back(nxt);
                    }
                }
            }
        }
        // fewer than n taken means a cycle kept some courses at indegree > 0
        if taken == n {
            semesters
        } else {
            -1
        }
    }
}
