#include <vector>

// One cached element standing in for "the future": the constructor advances
// the underlying cursor once and parks the element it lands on, so every call
// answers from the present — peek reads that parked element, next hands it
// over and refills it with one more cursor advance.
class PeekingIterator {
  public:
    PeekingIterator(vector<int> nums) : nums(nums), cache(nums[0]), index(1), has_cache(true) {
        // This single advance at construction is what makes peek possible.
    }

    int next() {
        // Hand over the cached element, then refill the cache with one more
        // cursor advance (to invalid once the sequence runs dry).
        int value = cache;
        has_cache = index < (int)nums.size();
        if (has_cache) {
            cache = nums[index];
        }
        ++index;
        return value;
    }

    bool hasNext() {
        // The cache IS the hasNext answer: something is waiting exactly
        // when the parked element exists.
        return has_cache;
    }

    int peek() {
        // The whole design in one line — the future is already in hand, so
        // looking at it costs nothing and moves nothing.
        return cache;
    }

  private:
    vector<int> nums;
    int cache;
    int index;
    bool has_cache;
};
