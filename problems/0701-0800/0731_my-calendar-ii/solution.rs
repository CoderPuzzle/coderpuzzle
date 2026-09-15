// Two interval lists. `singles` holds every accepted booking; `doubles`
// holds the regions where two accepted bookings already overlap. A new
// event is scanned against `doubles` first -- meeting any of them would
// park a third event on the same moment, so it is refused and nothing is
// recorded. Otherwise each accepted event it overlaps contributes the
// intersection to `doubles`, and the event itself joins `singles`.
pub struct MyCalendarTwo {
    singles: Vec<(i32, i32)>,
    doubles: Vec<(i32, i32)>,
}

impl MyCalendarTwo {
    pub fn new() -> Self {
        MyCalendarTwo {
            singles: Vec::new(),
            doubles: Vec::new(),
        }
    }

    pub fn book(&mut self, start: i32, end: i32) -> bool {
        for &(lo, hi) in &self.doubles {
            if start < hi && lo < end {
                return false;
            }
        }
        for &(lo, hi) in &self.singles {
            if start < hi && lo < end {
                self.doubles.push((start.max(lo), end.min(hi)));
            }
        }
        self.singles.push((start, end));
        true
    }
}
