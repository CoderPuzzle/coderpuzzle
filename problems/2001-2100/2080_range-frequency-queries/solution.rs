use std::collections::HashMap;

pub struct RangeFreqQuery {
    positions: HashMap<i32, Vec<i32>>,
}

impl RangeFreqQuery {
    pub fn new(arr: Vec<i32>) -> Self {
        let mut positions: HashMap<i32, Vec<i32>> = HashMap::new();
        for (index, value) in arr.into_iter().enumerate() {
            positions.entry(value).or_default().push(index as i32);
        }
        RangeFreqQuery { positions }
    }

    pub fn query(&mut self, left: i32, right: i32, value: i32) -> i32 {
        let Some(indices) = self.positions.get(&value) else {
            return 0;
        };
        (Self::lower_bound(indices, right + 1) - Self::lower_bound(indices, left)) as i32
    }

    fn lower_bound(indices: &[i32], target: i32) -> usize {
        let mut low = 0;
        let mut high = indices.len();
        while low < high {
            let middle = low + (high - low) / 2;
            if indices[middle] < target {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        low
    }
}
