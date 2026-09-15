use std::collections::{HashMap, VecDeque};

impl Solution {
    pub fn watched_videos_by_friends(
        watched_videos: Vec<Vec<String>>,
        friends: Vec<Vec<i32>>,
        id: i32,
        level: i32,
    ) -> Vec<String> {
        // BFS discovers nodes in increasing distance order, so the nodes whose
        // recorded distance equals `level` are exactly the level-k people.
        let n = friends.len();
        let mut dist = vec![-1i32; n];
        dist[id as usize] = 0;
        let mut queue = VecDeque::new();
        queue.push_back(id as usize);
        let mut counts: HashMap<String, i32> = HashMap::new();
        while let Some(cur) = queue.pop_front() {
            if dist[cur] == level {
                for video in &watched_videos[cur] {
                    *counts.entry(video.clone()).or_insert(0) += 1;
                }
                continue;
            }
            for &nxt in &friends[cur] {
                let nxt = nxt as usize;
                if dist[nxt] == -1 {
                    dist[nxt] = dist[cur] + 1;
                    queue.push_back(nxt);
                }
            }
        }
        let mut names: Vec<(i32, String)> = counts.into_iter().map(|(k, v)| (v, k)).collect();
        names.sort();
        names.into_iter().map(|(_, name)| name).collect()
    }
}
