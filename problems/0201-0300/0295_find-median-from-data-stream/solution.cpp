#include <functional>
#include <queue>
#include <vector>

class MedianFinder {
  public:
    MedianFinder() {}

    // Two heaps around the median: a max-heap holding the smaller half and
    // a min-heap holding the larger half. The sizes differ by at most one.
    void addNum(int num) {
        low.push(-(long long)num);
        // Route through both heaps: the largest of the small half crosses
        // over, then rebalance if the large half grew too big.
        high.push(-low.top());
        low.pop();
        if (high.size() > low.size()) {
            low.push(-high.top());
            high.pop();
        }
    }

    double findMedian() {
        if (low.size() > high.size()) {
            return -(double)low.top();
        }
        return (-(double)low.top() + (double)high.top()) / 2.0;
    }

  private:
    // Smaller half as a min-heap of negated values, larger half as a plain
    // min-heap; long long keeps the negation of INT_MIN in range.
    std::priority_queue<long long, std::vector<long long>, std::greater<long long>> low;
    std::priority_queue<long long, std::vector<long long>, std::greater<long long>> high;
};
