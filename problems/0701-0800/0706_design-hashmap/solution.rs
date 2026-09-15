// A fixed array of 1009 buckets -- 1009 is prime, so key patterns that
// repeat modulo a small number do not all pile into one bucket -- each
// holding a small list of (key, value) pairs. A key's remainder picks its
// bucket, and put, get and remove each scan that bucket alone: put replaces
// the value of an existing pair in place (never a duplicate), get returns
// the stored value or -1, and remove deletes the pair when present.
const BUCKET_COUNT: usize = 1009;

pub struct MyHashMap {
    buckets: Vec<Vec<(i32, i32)>>,
}

impl MyHashMap {
    pub fn new() -> Self {
        MyHashMap {
            buckets: vec![Vec::new(); BUCKET_COUNT],
        }
    }

    pub fn put(&mut self, key: i32, value: i32) {
        let bucket = &mut self.buckets[key.rem_euclid(BUCKET_COUNT as i32) as usize];
        for pair in bucket.iter_mut() {
            if pair.0 == key {
                pair.1 = value;
                return;
            }
        }
        bucket.push((key, value));
    }

    pub fn get(&mut self, key: i32) -> i32 {
        for pair in self.buckets[key.rem_euclid(BUCKET_COUNT as i32) as usize].iter() {
            if pair.0 == key {
                return pair.1;
            }
        }
        -1
    }

    pub fn remove(&mut self, key: i32) {
        let bucket = &mut self.buckets[key.rem_euclid(BUCKET_COUNT as i32) as usize];
        for (index, pair) in bucket.iter().enumerate() {
            if pair.0 == key {
                bucket.remove(index);
                return;
            }
        }
    }
}
