pub struct RangeModule {
    // Tracked set as canonical disjoint intervals (parallel starts/ends):
    // the vectors stay sorted and gap-separated, so a fully-tracked query
    // is always contained in a single stored interval.
    starts: Vec<i32>,
    ends: Vec<i32>,
}

// bisect_left: first index with values[index] >= target
fn lower_bound(values: &[i32], target: i32) -> usize {
    values.partition_point(|&value| value < target)
}

// bisect_right: first index with values[index] > target
fn upper_bound(values: &[i32], target: i32) -> usize {
    values.partition_point(|&value| value <= target)
}

// replaces values[from..to] with a single value
fn splice(values: &mut Vec<i32>, from: usize, to: usize, value: i32) {
    values.drain(from..to);
    values.insert(from, value);
}

// replaces values[from..to] with the replacement run (possibly empty)
fn replace(values: &mut Vec<i32>, from: usize, to: usize, replacement: &[i32]) {
    values.drain(from..to);
    for (offset, item) in replacement.iter().enumerate() {
        values.insert(from + offset, *item);
    }
}

impl RangeModule {
    pub fn new() -> Self {
        RangeModule {
            starts: Vec::new(),
            ends: Vec::new(),
        }
    }

    pub fn addRange(&mut self, start: i32, end: i32) {
        let i = lower_bound(&self.ends, start); // first interval ending at/after start
        let j = upper_bound(&self.starts, end); // first interval starting after end
        let (mut start, mut end) = (start, end);
        if i < j {
            start = start.min(self.starts[i]);
            end = end.max(self.ends[j - 1]);
        }
        splice(&mut self.starts, i, j, start);
        splice(&mut self.ends, i, j, end);
    }

    pub fn queryRange(&mut self, start: i32, end: i32) -> bool {
        // last interval starting at/before start, then one past it
        let i = upper_bound(&self.starts, start);
        i > 0 && self.ends[i - 1] >= end
    }

    pub fn removeRange(&mut self, start: i32, end: i32) {
        let i = upper_bound(&self.ends, start); // first interval ending after start
        let j = lower_bound(&self.starts, end); // first interval starting after end
        let mut new_starts: Vec<i32> = Vec::new();
        let mut new_ends: Vec<i32> = Vec::new();
        if i < j {
            if self.starts[i] < start {
                new_starts.push(self.starts[i]);
                new_ends.push(start);
            }
            if self.ends[j - 1] > end {
                new_starts.push(end);
                new_ends.push(self.ends[j - 1]);
            }
        }
        replace(&mut self.starts, i, j, &new_starts);
        replace(&mut self.ends, i, j, &new_ends);
    }
}
