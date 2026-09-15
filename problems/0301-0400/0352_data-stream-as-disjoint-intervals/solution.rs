// Sorted disjoint [start, end] intervals, merged at add time; addNum
// binary-searches the starts for the value's slot and repairs at most the
// two neighbors; getIntervals hands out a copy.
pub struct SummaryRanges {
    intervals: Vec<Vec<i32>>,
}

impl SummaryRanges {
    pub fn new() -> Self {
        SummaryRanges { intervals: Vec::new() }
    }

    pub fn addNum(&mut self, value: i32) {
        let index = self.intervals.partition_point(|interval| interval[0] < value);
        let touches_left = index > 0 && self.intervals[index - 1][1] + 1 >= value;
        let touches_right = index < self.intervals.len() && self.intervals[index][0] - 1 <= value;
        if touches_left && touches_right {
            // value welds the two neighbors into one interval.
            let end = self.intervals.remove(index)[1];
            self.intervals[index - 1][1] = end;
        } else if touches_left {
            // Extend the left neighbor; a value it already covers is a no-op.
            self.intervals[index - 1][1] = self.intervals[index - 1][1].max(value);
        } else if touches_right {
            self.intervals[index][0] = value;
        } else {
            self.intervals.insert(index, vec![value, value]);
        }
    }

    pub fn getIntervals(&mut self) -> Vec<Vec<i32>> {
        self.intervals.clone()
    }
}
