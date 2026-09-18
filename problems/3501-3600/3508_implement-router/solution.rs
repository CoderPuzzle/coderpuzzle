use std::collections::{HashMap, HashSet, VecDeque};

pub struct Router {
    limit: usize,
    // three parallel views of the stored packets: FIFO order, duplicate
    // detection, and an append-only timestamp log per destination
    queue: VecDeque<(i32, i32, i32)>,
    stored: HashSet<(i32, i32, i32)>,
    timestamps: HashMap<i32, Vec<i32>>,
    heads: HashMap<i32, usize>,
}

impl Router {
    pub fn new(capacity: i32) -> Self {
        Router {
            limit: capacity as usize,
            queue: VecDeque::new(),
            stored: HashSet::new(),
            timestamps: HashMap::new(),
            heads: HashMap::new(),
        }
    }

    pub fn addPacket(&mut self, source: i32, destination: i32, timestamp: i32) -> bool {
        let packet = (source, destination, timestamp);
        if self.stored.contains(&packet) {
            return false;
        }
        if self.queue.len() == self.limit {
            // the oldest packet leaves all three views; its log entry is only
            // abandoned past the head, never shifted out of the list
            let oldest = self.queue.pop_front().unwrap();
            self.stored.remove(&oldest);
            *self.heads.entry(oldest.1).or_insert(0) += 1;
        }
        self.queue.push_back(packet);
        self.stored.insert(packet);
        self.timestamps.entry(destination).or_default().push(timestamp);
        self.heads.entry(destination).or_insert(0);
        true
    }

    pub fn forwardPacket(&mut self) -> Vec<i32> {
        let (source, destination, timestamp) = match self.queue.pop_front() {
            None => return Vec::new(),
            Some(oldest) => oldest,
        };
        // forwarding hands over the oldest packet and drops it from every view
        self.stored.remove(&(source, destination, timestamp));
        *self.heads.entry(destination).or_insert(0) += 1;
        vec![source, destination, timestamp]
    }

    pub fn getCount(&mut self, destination: i32, startTime: i32, endTime: i32) -> i32 {
        let times = match self.timestamps.get(&destination) {
            None => return 0,
            Some(times) => times,
        };
        // adds arrive with non-decreasing timestamps, so each log is sorted
        // for free and the live entries are the suffix [head, len)
        let head = *self.heads.get(&destination).unwrap_or(&0);
        let low = Self::lower_bound(times, head, times.len(), startTime);
        let high = Self::upper_bound(times, head, times.len(), endTime);
        (high - low) as i32
    }

    fn lower_bound(times: &[i32], mut from: usize, mut to: usize, target: i32) -> usize {
        while from < to {
            let middle = (from + to) / 2;
            if times[middle] < target {
                from = middle + 1;
            } else {
                to = middle;
            }
        }
        from
    }

    fn upper_bound(times: &[i32], mut from: usize, mut to: usize, target: i32) -> usize {
        while from < to {
            let middle = (from + to) / 2;
            if times[middle] <= target {
                from = middle + 1;
            } else {
                to = middle;
            }
        }
        from
    }
}
