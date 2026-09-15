use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap, HashSet};

pub struct FileSharing {
    chunks: HashMap<i32, HashSet<i32>>,
    alive: HashSet<i32>,
    freed: BinaryHeap<Reverse<i32>>,
    next_id: i32,
}

impl FileSharing {
    pub fn new(m: i32) -> Self {
        FileSharing {
            chunks: HashMap::new(),
            alive: HashSet::new(),
            freed: BinaryHeap::new(),
            next_id: 1,
        }
    }

    pub fn join(&mut self, owned_chunks: Vec<i32>) -> i32 {
        let uid = match self.freed.pop() {
            Some(Reverse(id)) => id,
            None => {
                let id = self.next_id;
                self.next_id += 1;
                id
            }
        };
        self.chunks.insert(uid, owned_chunks.into_iter().collect());
        self.alive.insert(uid);
        uid
    }

    pub fn leave(&mut self, user_id: i32) {
        self.chunks.remove(&user_id);
        self.alive.remove(&user_id);
        self.freed.push(Reverse(user_id));
    }

    pub fn request(&mut self, user_id: i32, chunk_id: i32) -> Vec<i32> {
        let mut owners: Vec<i32> = self
            .alive
            .iter()
            .copied()
            .filter(|uid| self.chunks[uid].contains(&chunk_id))
            .collect();
        owners.sort();
        if !owners.is_empty() {
            self.chunks.entry(user_id).or_default().insert(chunk_id);
        }
        owners
    }
}
