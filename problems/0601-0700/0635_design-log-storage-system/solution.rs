// Logs kept as parallel id/timestamp vectors in put order; retrieve truncates
// every string to the granularity's fixed-width prefix and keeps the logs
// whose truncated timestamp compares between the truncated bounds —
// zero-padded fields make that exact.
pub struct LogSystem {
    ids: Vec<i32>,
    timestamps: Vec<String>,
}

impl LogSystem {
    pub fn new() -> Self {
        LogSystem {
            ids: Vec::new(),
            timestamps: Vec::new(),
        }
    }

    pub fn put(&mut self, id: i32, timestamp: String) {
        self.ids.push(id);
        self.timestamps.push(timestamp);
    }

    pub fn retrieve(&mut self, start: String, end: String, granularity: String) -> Vec<i32> {
        // Prefix length per granularity: "2017" for Year, one more ":XX"
        // field per step down to the full 19 characters.
        let width = match granularity.as_str() {
            "Year" => 4,
            "Month" => 7,
            "Day" => 10,
            "Hour" => 13,
            "Minute" => 16,
            _ => 19,
        };
        let (low, high) = (&start[..width], &end[..width]);
        // The scan walks the store oldest-first, so the ids come back in
        // the order their logs were stored.
        self.ids
            .iter()
            .zip(self.timestamps.iter())
            .filter(|(_, timestamp)| {
                // Same-width truncations compare exactly like their fields.
                let truncated = &timestamp[..width];
                low <= truncated && truncated <= high
            })
            .map(|(id, _)| *id)
            .collect()
    }
}
