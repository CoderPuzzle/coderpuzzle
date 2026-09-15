use std::collections::{HashMap, VecDeque};

impl Solution {
    pub fn find_all_people(n: i32, mut meetings: Vec<Vec<i32>>, first_person: i32) -> Vec<i32> {
        meetings.sort_unstable_by_key(|meeting| meeting[2]);
        let mut knows = vec![false; n as usize];
        knows[0] = true;
        knows[first_person as usize] = true;
        let mut start = 0;
        while start < meetings.len() {
            let mut end = start;
            let mut graph: HashMap<usize, Vec<usize>> = HashMap::new();
            while end < meetings.len() && meetings[end][2] == meetings[start][2] {
                let x = meetings[end][0] as usize;
                let y = meetings[end][1] as usize;
                graph.entry(x).or_default().push(y);
                graph.entry(y).or_default().push(x);
                end += 1;
            }

            let mut queue: VecDeque<usize> = graph.keys().copied().filter(|&person| knows[person]).collect();
            while let Some(person) = queue.pop_front() {
                for &other in graph.get(&person).unwrap() {
                    if !knows[other] {
                        knows[other] = true;
                        queue.push_back(other);
                    }
                }
            }
            start = end;
        }

        knows
            .into_iter()
            .enumerate()
            .filter_map(|(person, informed)| informed.then_some(person as i32))
            .collect()
    }
}
