use std::collections::HashMap;
use std::collections::VecDeque;

// A FIFO queue of (tokenId, expiry) events plus a map of each token's
// current expiry. Call times strictly increase and an expiry is always
// currentTime + timeToLive, so every generate — and every fulfilled renew
// — appends the largest expiry seen so far to the tail; expiries grow
// along the queue. countUnexpiredTokens retires the front while it is
// stale (a renew superseded it) or expired, and then the map's size is
// the live count: nothing behind an unexpired front can be expired.
pub struct AuthenticationManager {
    time_to_live: i32,
    expiry_by_token: HashMap<String, i32>,
    queue: VecDeque<Entry>,
}

struct Entry {
    token_id: String,
    expiry: i32,
}

impl AuthenticationManager {
    pub fn new(timeToLive: i32) -> Self {
        AuthenticationManager {
            time_to_live: timeToLive,
            expiry_by_token: HashMap::new(),
            queue: VecDeque::new(),
        }
    }

    pub fn generate(&mut self, tokenId: String, currentTime: i32) {
        let expiry = currentTime + self.time_to_live;
        self.expiry_by_token.insert(tokenId.clone(), expiry);
        self.queue.push_back(Entry {
            token_id: tokenId,
            expiry,
        });
    }

    pub fn renew(&mut self, tokenId: String, currentTime: i32) {
        if let Some(&expiry) = self.expiry_by_token.get(&tokenId) {
            if expiry > currentTime {
                let renewed = currentTime + self.time_to_live;
                self.expiry_by_token.insert(tokenId.clone(), renewed);
                self.queue.push_back(Entry {
                    token_id: tokenId,
                    expiry: renewed,
                });
            }
        }
    }

    pub fn countUnexpiredTokens(&mut self, currentTime: i32) -> i32 {
        while let Some(front) = self.queue.front().map(|entry| (entry.token_id.clone(), entry.expiry)) {
            let (token_id, expiry) = front;
            if self.expiry_by_token.get(&token_id) == Some(&expiry) {
                if expiry > currentTime {
                    break;
                }
                self.expiry_by_token.remove(&token_id);
            }
            self.queue.pop_front();
        }
        self.expiry_by_token.len() as i32
    }
}
