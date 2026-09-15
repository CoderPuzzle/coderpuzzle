#include <functional>
#include <queue>
#include <unordered_set>
#include <vector>

// A used set, a fresh-number counter, and a released min-heap: get()
// pops the smallest released number before minting a fresh one, so the
// smallest available number always comes out; release() is a no-op on an
// available number.
class PhoneDirectory {
  public:
    PhoneDirectory(int maxNumbers) : limit(maxNumbers) {}

    int get() {
        if (!released.empty()) {
            // Every released number is smaller than every fresh one, so
            // the heap's minimum is the smallest available number.
            int number = released.top();
            released.pop();
            used.insert(number);
            return number;
        }
        if (next < limit) {
            // Fresh numbers are minted in ascending order, so the counter
            // itself needs no bookkeeping.
            int number = next;
            ++next;
            used.insert(number);
            return number;
        }
        return -1;
    }

    bool check(int number) { return used.count(number) == 0; }

    void release(int number) {
        // erase() answers how many members were removed, which makes
        // releasing an available number a no-op.
        if (used.erase(number) > 0) {
            released.push(number);
        }
    }

  private:
    int limit;
    int next = 0;
    unordered_set<int> used;
    // std::priority_queue is a max-heap; greater<int> flips it to the
    // min order the pinned get() needs.
    priority_queue<int, vector<int>, greater<int>> released;
};
