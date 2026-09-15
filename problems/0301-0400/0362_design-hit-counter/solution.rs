// Distinct timestamps with their hit counts, oldest first; getHits drops
// everything at or before timestamp - 300 off the front and sums what
// survives — the window is (timestamp - 300, timestamp].
pub struct HitCounter {
    hits: Vec<(i32, i32)>,
}

impl HitCounter {
    pub fn new() -> Self {
        HitCounter { hits: Vec::new() }
    }

    pub fn hit(&mut self, timestamp: i32) {
        if let Some(newest) = self.hits.last_mut() {
            if newest.0 == timestamp {
                // Several hits may arrive at the same second; bumping the
                // newest count keeps one entry per distinct timestamp.
                newest.1 += 1;
                return;
            }
        }
        self.hits.push((timestamp, 1));
    }

    pub fn getHits(&mut self, timestamp: i32) -> i32 {
        let cutoff = timestamp - 300;
        while self.hits.first().map_or(false, |hit| hit.0 <= cutoff) {
            // The window is (timestamp - 300, timestamp]: a hit at
            // exactly the cutoff second is already gone.
            self.hits.remove(0);
        }
        self.hits.iter().map(|hit| hit.1).sum()
    }
}
