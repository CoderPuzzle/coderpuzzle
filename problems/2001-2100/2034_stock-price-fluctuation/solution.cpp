#include <queue>
#include <unordered_map>
#include <utility>
#include <vector>

class StockPrice {
  public:
    StockPrice() = default;

    void update(int timestamp, int price) {
        priceAt[timestamp] = price;
        if (timestamp > latestTimestamp) {
            latestTimestamp = timestamp;
        }
        maxHeap.push({price, timestamp});
        minHeap.push({price, timestamp});
    }

    int current() { return priceAt[latestTimestamp]; }

    int maximum() {
        // An entry is garbage exactly when its timestamp now maps to a
        // different price; pop those, then the top is the true highest.
        for (;;) {
            std::pair<int, int> top = maxHeap.top();
            if (priceAt[top.second] == top.first) {
                return top.first;
            }
            maxHeap.pop();
        }
    }

    int minimum() {
        // Same lazy cleanup on the min side.
        for (;;) {
            std::pair<int, int> top = minHeap.top();
            if (priceAt[top.second] == top.first) {
                return top.first;
            }
            minHeap.pop();
        }
    }

  private:
    // timestamp -> currently valid price; a correction is an overwrite.
    std::unordered_map<int, int> priceAt;
    // Twin lazy heaps over (price, timestamp): entries are pushed on
    // record and never removed; stale ones are discarded only at the top.
    std::priority_queue<std::pair<int, int>> maxHeap;
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>>
        minHeap;
    int latestTimestamp = 0;
};
