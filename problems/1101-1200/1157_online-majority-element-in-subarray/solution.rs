use std::collections::HashMap;

fn merge_majority(left: (i32, i32), right: (i32, i32)) -> (i32, i32) {
    if left.0 == right.0 {
        return (left.0, left.1 + right.1);
    }
    if left.1 > right.1 {
        return (left.0, left.1 - right.1);
    }
    if right.1 > left.1 {
        return (right.0, right.1 - left.1);
    }
    (0, 0)
}

fn lower_bound(values: &[i32], target: i32) -> usize {
    values.partition_point(|&value| value < target)
}

pub struct MajorityChecker {
    n: usize,
    candidate_of: Vec<i32>,
    surplus_of: Vec<i32>,
    positions: HashMap<i32, Vec<i32>>,
}

impl MajorityChecker {
    pub fn new(arr: Vec<i32>) -> Self {
        let n = arr.len();
        let mut design = MajorityChecker {
            n,
            candidate_of: vec![0; 4 * n],
            surplus_of: vec![0; 4 * n],
            positions: HashMap::new(),
        };
        design.build(1, 0, n - 1, &arr);
        for (index, &value) in arr.iter().enumerate() {
            design.positions.entry(value).or_default().push(index as i32);
        }
        design
    }

    fn build(&mut self, node: usize, lo: usize, hi: usize, arr: &[i32]) {
        if lo == hi {
            self.candidate_of[node] = arr[lo];
            self.surplus_of[node] = 1;
            return;
        }
        let mid = lo + (hi - lo) / 2;
        self.build(2 * node, lo, mid, arr);
        self.build(2 * node + 1, mid + 1, hi, arr);
        let merged = merge_majority(
            (self.candidate_of[2 * node], self.surplus_of[2 * node]),
            (self.candidate_of[2 * node + 1], self.surplus_of[2 * node + 1]),
        );
        self.candidate_of[node] = merged.0;
        self.surplus_of[node] = merged.1;
    }

    pub fn query(&mut self, left: i32, right: i32, threshold: i32) -> i32 {
        let candidate = self.fold(1, 0, self.n - 1, left as usize, right as usize).0;
        let occurrences = match self.positions.get(&candidate) {
            None => return -1,
            Some(occurrences) => occurrences,
        };
        let count = lower_bound(occurrences, right + 1) - lower_bound(occurrences, left);
        if count >= threshold as usize {
            candidate
        } else {
            -1
        }
    }

    fn fold(&self, node: usize, lo: usize, hi: usize, left: usize, right: usize) -> (i32, i32) {
        if left <= lo && hi <= right {
            return (self.candidate_of[node], self.surplus_of[node]);
        }
        let mid = lo + (hi - lo) / 2;
        if right <= mid {
            return self.fold(2 * node, lo, mid, left, right);
        }
        if left > mid {
            return self.fold(2 * node + 1, mid + 1, hi, left, right);
        }
        merge_majority(
            self.fold(2 * node, lo, mid, left, right),
            self.fold(2 * node + 1, mid + 1, hi, left, right),
        )
    }
}
