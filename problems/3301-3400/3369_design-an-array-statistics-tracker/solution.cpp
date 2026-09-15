#include <deque>
#include <functional>
#include <queue>
#include <stdexcept>
#include <unordered_map>
#include <utility>
#include <vector>

// Every statistic lives in its own incrementally maintained structure: a
// queue holds arrival order, a running sum serves the mean, two heaps
// split the live values into a lower and an upper half so the median is
// always at a top, and a (-count, value) heap answers the mode. Removals
// are FIFO and arbitrary for a heap, so an erased value is only marked in
// a delayed counter and discarded when it surfaces at a top; rebalancing
// counts only live entries, and the mode heap's stale entries are skipped
// lazily the same way. Each call costs O(log n) amortized. The running
// sum reaches 1e5 * 1e9 = 1e14, so it is held in a long long.
class StatisticsTracker {
  public:
    StatisticsTracker() = default;

    void addNumber(int number) {
        queue.push_back(number);
        total += number;
        ++counts[number];
        // An entry exists for every count level each value reaches, so
        // the current count of any live value is always in the heap.
        modeHeap.push({-counts[number], number});
        if (small.empty() || number <= small.top()) {
            small.push(number);
            ++smallSize;
        } else {
            large.push(number);
            ++largeSize;
        }
        rebalance();
    }

    void removeFirstAddedNumber() {
        int number = queue.front();
        queue.pop_front();
        total -= number;
        --counts[number];
        // The ghost is charged to the half its value belongs to; when a
        // matching copy surfaces at that top it is discarded, which keeps
        // fungible duplicates consistent.
        ++delayed[number];
        if (number <= small.top()) {
            --smallSize;
            if (number == small.top())
                pruneSmall();
        } else {
            --largeSize;
            if (number == large.top())
                pruneLarge();
        }
        rebalance();
    }

    int getMean() { return (int)(total / (long long)queue.size()); }

    int getMedian() {
        pruneSmall();
        pruneLarge();
        if (smallSize > largeSize)
            return small.top();
        // Even count: the larger of the two middles is the upper half's
        // minimum.
        return large.top();
    }

    int getMode() {
        while (!modeHeap.empty()) {
            if (counts[modeHeap.top().second] == -modeHeap.top().first) {
                return modeHeap.top().second;
            }
            modeHeap.pop();
        }
        throw std::logic_error("empty tracker");
    }

  private:
    std::deque<int> queue;
    long long total = 0;
    // small is a raw max-heap over the lower half; large is a min-heap.
    std::priority_queue<int> small;
    std::priority_queue<int, std::vector<int>, std::greater<int>> large;
    int smallSize = 0; // live sizes, ghosts excluded
    int largeSize = 0;
    std::unordered_map<int, int> delayed;
    std::unordered_map<int, int> counts;
    // Pairs (-count, value) under greater<>: the top is the highest
    // count, ties broken toward the smallest value.
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>>
        modeHeap;

    // Discard ghosts queued for deletion while they sit at the top.
    void pruneSmall() {
        while (!small.empty()) {
            int value = small.top();
            if (delayed[value] > 0) {
                --delayed[value];
                small.pop();
            } else {
                break;
            }
        }
    }

    void pruneLarge() {
        while (!large.empty()) {
            int value = large.top();
            if (delayed[value] > 0) {
                --delayed[value];
                large.pop();
            } else {
                break;
            }
        }
    }

    // Keep ceil(n/2) live values in small; the median read sits at a top
    // after this. Moves only touch pruned, live tops.
    void rebalance() {
        if (smallSize > largeSize + 1) {
            large.push(small.top());
            small.pop();
            --smallSize;
            ++largeSize;
            pruneSmall();
        } else if (smallSize < largeSize) {
            small.push(large.top());
            large.pop();
            ++smallSize;
            --largeSize;
            pruneLarge();
        }
    }
};
