#include <iterator>
#include <list>
#include <string>
#include <unordered_map>
#include <unordered_set>

// One bucket per count — (count, the keys at it) — held in a std::list kept
// in ascending count order with sentinels at both ends; every inc/dec walks
// its key exactly one bucket over, splicing the neighboring count in when it
// is missing and erasing buckets that empty out, so the extremes sit at the
// list's ends.
class AllOne {
  public:
    AllOne() {
        buckets.push_back({0, {}}); // sentinel below every real count
        buckets.push_back({0, {}}); // sentinel above every real count
    }

    void inc(string key) {
        auto found = keyBucket.find(key);
        Iter anchor = (found == keyBucket.end()) ? buckets.begin() : found->second;
        int count = (found == keyBucket.end()) ? 1 : anchor->first + 1;
        // The needed count is exactly one past the anchor's, so only its
        // immediate successor can already hold it.
        Iter bucket = next(anchor);
        if (bucket->first != count) {
            bucket = buckets.insert(bucket, {count, {}});
        }
        bucket->second.insert(key);
        if (found != keyBucket.end()) {
            anchor->second.erase(key);
            if (anchor->second.empty()) {
                buckets.erase(anchor);
            }
        }
        keyBucket[key] = bucket;
    }

    void dec(string key) {
        Iter old = keyBucket[key]; // the statement guarantees presence
        keyBucket.erase(key);
        if (old->first > 1) {
            int count = old->first - 1;
            Iter bucket = prev(old);
            if (bucket->first != count) {
                bucket = buckets.insert(old, {count, {}});
            }
            bucket->second.insert(key);
            keyBucket[key] = bucket;
        }
        old->second.erase(key);
        if (old->second.empty()) {
            buckets.erase(old);
        }
    }

    string getMaxKey() {
        Iter bucket = prev(prev(buckets.end()));
        return (bucket->first == 0) ? "" : pinned(bucket);
    }

    string getMinKey() {
        Iter bucket = next(buckets.begin());
        return (bucket->first == 0) ? "" : pinned(bucket);
    }

  private:
    using Iter = std::list<std::pair<int, std::unordered_set<string>>>::iterator;

    static string pinned(Iter bucket) {
        // Several keys may share the extreme count; the lexicographically
        // smallest of them is the pinned answer.
        const string *best = nullptr;
        for (const string &key : bucket->second) {
            if (best == nullptr || key < *best) {
                best = &key;
            }
        }
        return *best;
    }

    std::list<std::pair<int, std::unordered_set<string>>> buckets;
    std::unordered_map<string, Iter> keyBucket;
};
