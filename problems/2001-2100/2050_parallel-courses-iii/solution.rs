use std::collections::VecDeque;

impl Solution {
    pub fn minimum_time(n: i32, relations: Vec<Vec<i32>>, time: Vec<i32>) -> i32 {
        let n = n as usize;
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        let mut indegree = vec![0i32; n + 1];
        for relation in &relations {
            let prev = relation[0] as usize;
            let nxt = relation[1] as usize;
            adjacency[prev].push(nxt);
            indegree[nxt] += 1;
        }
        // finish[i] = earliest month at which course i completes.
        let mut finish = vec![0i32; n + 1];
        // Longest weighted chain on the prerequisite DAG: with unlimited
        // parallelism a course finishes at its duration plus the latest
        // prerequisite finish. Kahn's order makes every prerequisite final
        // before a course is processed.
        let mut queue: VecDeque<usize> = VecDeque::new();
        for i in 1..=n {
            if indegree[i] == 0 {
                finish[i] = time[i - 1];
                queue.push_back(i);
            }
        }
        // Finishing everything means finishing the latest-ending chain.
        let mut answer = 0;
        while let Some(course) = queue.pop_front() {
            answer = answer.max(finish[course]);
            for &nxt in &adjacency[course] {
                // Relax with a max: the successor waits for ALL of its
                // prerequisites, not just the first to finish.
                finish[nxt] = finish[nxt].max(finish[course] + time[nxt - 1]);
                indegree[nxt] -= 1;
                if indegree[nxt] == 0 {
                    queue.push_back(nxt);
                }
            }
        }
        answer
    }
}
