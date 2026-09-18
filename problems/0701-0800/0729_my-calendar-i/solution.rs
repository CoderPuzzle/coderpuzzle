pub struct MyCalendar {
    // Accepted reservations as parallel sorted starts/ends: a new event can
    // only conflict with the reservation before and after its insertion
    // point; binary search locates them in O(log n).
    starts: Vec<i32>,
    ends: Vec<i32>,
}

impl MyCalendar {
    pub fn new() -> Self {
        MyCalendar {
            starts: Vec::new(),
            ends: Vec::new(),
        }
    }

    pub fn book(&mut self, start: i32, end: i32) -> bool {
        // bisect_right: first index whose start exceeds `start`.
        let position = self.starts.partition_point(|&value| value <= start);
        let index = position as isize - 1; // last reservation with start <= start
                                           // Half-open intervals: strict tests mean touching endpoints coexist.
        if index >= 0 && self.ends[index as usize] > start {
            return false;
        }
        let next = (index + 1) as usize;
        if next < self.starts.len() && self.starts[next] < end {
            return false;
        }
        // Insert exactly at the searched position — stays sorted, no re-sort.
        self.starts.insert(position, start);
        self.ends.insert(position, end);
        true
    }
}
