#include <algorithm>
#include <vector>

// A fixed array of 769 buckets: key % 769 selects the bucket, and the
// bucket's short list holds exactly the keys that hashed there. add()
// appends only when the key is absent, remove() erases only when the key
// is present, and contains() scans the one bucket. 769 is prime, so
// repetitive key patterns spread out instead of piling onto one bucket.
class MyHashSet {
  public:
    MyHashSet() {}

    void add(int key) {
        std::vector<int> &bucket = buckets[key % BUCKETS];
        if (std::find(bucket.begin(), bucket.end(), key) == bucket.end()) {
            bucket.push_back(key);
        }
    }

    void remove(int key) {
        std::vector<int> &bucket = buckets[key % BUCKETS];
        bucket.erase(std::remove(bucket.begin(), bucket.end(), key), bucket.end());
    }

    bool contains(int key) {
        std::vector<int> &bucket = buckets[key % BUCKETS];
        return std::find(bucket.begin(), bucket.end(), key) != bucket.end();
    }

  private:
    static constexpr int BUCKETS = 769;
    std::vector<std::vector<int>> buckets = std::vector<std::vector<int>>(BUCKETS);
};
