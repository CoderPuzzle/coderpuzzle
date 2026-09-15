pub struct BrowserHistory {
    history: Vec<String>,
    cur: usize,
}

impl BrowserHistory {
    pub fn new(homepage: String) -> Self {
        BrowserHistory {
            history: vec![homepage],
            cur: 0,
        }
    }

    pub fn visit(&mut self, url: String) {
        self.history.truncate(self.cur + 1);
        self.history.push(url);
        self.cur += 1;
    }

    pub fn back(&mut self, steps: i32) -> String {
        self.cur = self.cur.saturating_sub(steps as usize);
        self.history[self.cur].clone()
    }

    pub fn forward(&mut self, steps: i32) -> String {
        let limit = self.history.len() - 1;
        self.cur = (self.cur + steps as usize).min(limit);
        self.history[self.cur].clone()
    }
}
