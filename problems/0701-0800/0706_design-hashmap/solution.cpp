#include <utility>
#include <vector>

// A fixed array of 1009 buckets -- 1009 is prime, so key patterns that
// repeat modulo a small number do not all pile into one bucket -- each
// holding a small list of (key, value) pairs. A key's remainder picks its
// bucket, and put, get and remove each scan that bucket alone: put replaces
// the value of an existing pair in place (never a duplicate), get returns
// the stored value or -1, and remove deletes the pair when present.
class MyHashMap {
  public:
    MyHashMap() {}

    void put(int key, int value) {
        vector<pair<int, int>> &bucket = buckets[key % SIZE];
        for (pair<int, int> &entry : bucket) {
            if (entry.first == key) {
                entry.second = value;
                return;
            }
        }
        bucket.emplace_back(key, value);
    }

    int get(int key) {
        for (const pair<int, int> &entry : buckets[key % SIZE]) {
            if (entry.first == key) {
                return entry.second;
            }
        }
        return -1;
    }

    void remove(int key) {
        vector<pair<int, int>> &bucket = buckets[key % SIZE];
        for (int index = 0; index < (int)bucket.size(); ++index) {
            if (bucket[index].first == key) {
                bucket.erase(bucket.begin() + index);
                return;
            }
        }
    }

  private:
    static constexpr int SIZE = 1009;

    vector<vector<pair<int, int>>> buckets = vector<vector<pair<int, int>>>(SIZE);
};
