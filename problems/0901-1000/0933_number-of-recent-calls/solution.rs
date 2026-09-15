use std::collections::VecDeque;

// A queue of ping times: ping(t) appends t, evicts everything older
// than the window's left edge t - 3000 off the front — a time below
// that edge is below every future edge too, since t only grows — and
// returns how many times remain.
pub struct RecentCounter {
    times: VecDeque<i32>,
}

impl RecentCounter {
    pub fn new() -> Self {
        RecentCounter { times: VecDeque::new() }
    }

    pub fn ping(&mut self, t: i32) -> i32 {
        self.times.push_back(t);
        while self.times.front().map_or(false, |&oldest| oldest < t - 3000) {
            // The left edge t - 3000 only moves right, so everything
            // evicted now is gone from every future window as well.
            self.times.pop_front();
        }
        self.times.len() as i32
    }
}
