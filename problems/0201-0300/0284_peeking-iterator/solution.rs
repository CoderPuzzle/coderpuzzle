// One cached element standing in for "the future": the constructor advances
// the underlying cursor once and parks the element it lands on, so every call
// answers from the present — peek reads that parked element, next hands it
// over and refills it with one more cursor advance.
pub struct PeekingIterator {
    nums: Vec<i32>,
    cache: Option<i32>,
    index: usize,
}

impl PeekingIterator {
    pub fn new(nums: Vec<i32>) -> Self {
        // The cursor sits one past the element held in the cache — this
        // single advance at construction is what makes peek possible.
        let cache = Some(nums[0]);
        PeekingIterator { nums, cache, index: 1 }
    }

    pub fn next(&mut self) -> i32 {
        // Hand over the cached element, then refill the cache with one more
        // cursor advance (to None once the sequence runs dry).
        let value = self.cache.unwrap();
        self.cache = self.nums.get(self.index).copied();
        self.index += 1;
        value
    }

    pub fn hasNext(&mut self) -> bool {
        // The cache IS the hasNext answer: something is waiting exactly
        // when the parked element exists.
        self.cache.is_some()
    }

    pub fn peek(&mut self) -> i32 {
        // The whole design in one line — the future is already in hand, so
        // looking at it costs nothing and moves nothing.
        self.cache.unwrap()
    }
}
