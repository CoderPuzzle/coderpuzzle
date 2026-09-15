// A fixed array of 769 buckets: key % 769 selects the bucket, and the
// bucket's short list holds exactly the keys that hashed there. add()
// appends only when the key is absent, remove() deletes only when the key
// is present, and contains() scans the one bucket. 769 is prime, so
// repetitive key patterns spread out instead of piling onto one bucket.
const BUCKETS: usize = 769;

pub struct MyHashSet {
    buckets: Vec<Vec<i32>>,
}

impl MyHashSet {
    pub fn new() -> Self {
        MyHashSet {
            buckets: vec![Vec::new(); BUCKETS],
        }
    }

    pub fn add(&mut self, key: i32) {
        let bucket = &mut self.buckets[(key % BUCKETS as i32) as usize];
        if !bucket.contains(&key) {
            bucket.push(key);
        }
    }

    pub fn remove(&mut self, key: i32) {
        let index = (key % BUCKETS as i32) as usize;
        if let Some(position) = self.buckets[index].iter().position(|stored| *stored == key) {
            self.buckets[index].remove(position);
        }
    }

    pub fn contains(&mut self, key: i32) -> bool {
        self.buckets[(key % BUCKETS as i32) as usize].contains(&key)
    }
}
