// Problem-provided oracle (BigArray), Rust side. Assembled into
// every submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the maximal blocks of the hidden
// array as one generic value (each block a [value, count] pair), then
// the query budget. Positions are 64-bit throughout.
#[allow(dead_code)]
pub struct BigArray {
    values: Vec<i64>,
    starts: Vec<i64>,
    total: i64,
    budget: i64,
}

impl BigArray {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let raw = match construction.first() {
            Some(OjValue::Array(blocks)) => blocks.clone(),
            _ => panic!("BigArray blocks must be an array"),
        };
        let mut values = Vec::with_capacity(raw.len());
        let mut starts = Vec::with_capacity(raw.len());
        let mut offset: i64 = 0;
        let mut previous: i64 = 0;
        for (position, block) in raw.iter().enumerate() {
            match block {
                OjValue::Array(pair) if pair.len() == 2 => {
                    let value = match &pair[0] {
                        OjValue::Int(v) => *v,
                        _ => panic!("BigArray block entries must be integers"),
                    };
                    let count = match &pair[1] {
                        OjValue::Int(v) => *v,
                        _ => panic!("BigArray block entries must be integers"),
                    };
                    if position > 0 && value == previous {
                        panic!("BigArray blocks must alternate values");
                    }
                    values.push(value);
                    starts.push(offset);
                    offset += count;
                    previous = value;
                }
                _ => panic!("BigArray blocks must be [value, count] pairs"),
            }
        }
        BigArray {
            values,
            starts,
            total: offset,
            budget,
        }
    }

    pub fn at(&mut self, index: i64) -> i32 {
        if self.budget <= 0 {
            panic!("BigArray query budget exhausted");
        }
        self.budget -= 1;
        let mut lo: usize = 0;
        let mut hi: usize = self.starts.len();
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if self.starts[mid] <= index {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        self.values[lo - 1] as i32
    }

    pub fn size(&self) -> i64 {
        self.total
    }
}
