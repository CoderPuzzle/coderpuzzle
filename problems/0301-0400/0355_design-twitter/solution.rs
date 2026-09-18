use std::collections::{HashMap, HashSet};

// Per-user chronological message lists (newest last) plus follow sets.
// getFeed merges the last 10 messages of the user and every followee,
// keeping only the 10 most recent by global timestamp.
pub struct Twitter {
    posts: HashMap<i32, Vec<(i64, i32)>>, // user -> (time, id), newest last
    following: HashMap<i32, HashSet<i32>>,
    clock: i64,
}

impl Twitter {
    pub fn new() -> Self {
        Twitter {
            posts: HashMap::new(),
            following: HashMap::new(),
            clock: 0,
        }
    }

    pub fn postTweet(&mut self, userId: i32, messageId: i32) {
        self.posts.entry(userId).or_default().push((self.clock, messageId));
        self.clock += 1;
    }

    pub fn getNewsFeed(&mut self, userId: i32) -> Vec<i32> {
        let mut sources: HashSet<i32> = HashSet::new();
        sources.insert(userId);
        if let Some(followed) = self.following.get(&userId) {
            sources.extend(followed.iter().copied());
        }
        // Bounded min-heap of (time, id): at most 10 entries survive, so
        // a linear scan for the minimum replaces heap machinery.
        let mut kept: Vec<(i64, i32)> = Vec::with_capacity(10);
        for source in sources {
            let timeline = match self.posts.get(&source) {
                Some(timeline) => timeline,
                None => continue,
            };
            let start = timeline.len().saturating_sub(10);
            for entry in &timeline[start..] {
                if kept.len() < 10 {
                    kept.push(*entry);
                    continue;
                }
                // Evict the smallest kept entry when the candidate is newer.
                let mut oldest = 0;
                for other in 1..kept.len() {
                    if kept[other] < kept[oldest] {
                        oldest = other;
                    }
                }
                if *entry > kept[oldest] {
                    kept[oldest] = *entry;
                }
            }
        }
        // Newest first: sort descending by (time, id).
        kept.sort_unstable_by(|a, b| b.cmp(a));
        kept.into_iter().map(|(_, id)| id).collect()
    }

    pub fn follow(&mut self, followerId: i32, followeeId: i32) {
        self.following.entry(followerId).or_default().insert(followeeId);
    }

    pub fn unfollow(&mut self, followerId: i32, followeeId: i32) {
        if let Some(set) = self.following.get_mut(&followerId) {
            set.remove(&followeeId);
        }
    }
}
