use std::collections::HashMap;

// One map entry per message: the next timestamp it may print at.
pub struct Logger {
    next_allowed: HashMap<String, i32>,
}

impl Logger {
    pub fn new() -> Self {
        Logger {
            next_allowed: HashMap::new(),
        }
    }

    pub fn shouldPrintMessage(&mut self, timestamp: i32, message: String) -> bool {
        // A stored boundary blocks strictly earlier arrivals; anything at
        // or past it prints and pushes the boundary ten seconds ahead.
        if let Some(&allowed) = self.next_allowed.get(message.as_str()) {
            if timestamp < allowed {
                return false;
            }
        }
        self.next_allowed.insert(message, timestamp + 10);
        true
    }
}
