class PeekingIterator {

    // One cached element standing in for "the future": the constructor
    // advances the underlying cursor once and parks the element it lands on,
    // so every call answers from the present — peek reads that parked
    // element, next hands it over and refills it with one more cursor
    // advance.
    private final int[] nums;
    private Integer cache;
    private int index;

    public PeekingIterator(int[] nums) {
        // The cursor sits one past the element held in the cache — this
        // single advance at construction is what makes peek possible.
        this.nums = nums;
        this.cache = nums[0];
        this.index = 1;
    }

    public int next() {
        // Hand over the cached element, then refill the cache with one more
        // cursor advance (to null once the sequence runs dry).
        int value = cache;
        if (index < nums.length) {
            cache = nums[index];
        } else {
            cache = null;
        }
        ++index;
        return value;
    }

    public boolean hasNext() {
        // The cache IS the hasNext answer: something is waiting exactly
        // when the parked element exists.
        return cache != null;
    }

    public int peek() {
        // The whole design in one line — the future is already in hand, so
        // looking at it costs nothing and moves nothing.
        return cache;
    }
}
