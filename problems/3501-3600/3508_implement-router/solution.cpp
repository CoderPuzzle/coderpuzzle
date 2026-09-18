#include <array>
#include <deque>
#include <unordered_map>
#include <unordered_set>
#include <vector>

class Router {
  public:
    Router(int capacity) : limit(capacity) {}

    bool addPacket(int source, int destination, int timestamp) {
        if (stored[pairKey(source, destination)].count(timestamp) != 0) {
            return false;
        }
        if ((int)queue.size() == limit) {
            // the oldest packet leaves all three views; its log entry is only
            // abandoned past the head, never shifted out of the list
            std::array<int, 3> oldest = queue.front();
            queue.pop_front();
            stored[pairKey(oldest[0], oldest[1])].erase(oldest[2]);
            heads[oldest[1]] += 1;
        }
        queue.push_back({source, destination, timestamp});
        stored[pairKey(source, destination)].insert(timestamp);
        timestamps[destination].push_back(timestamp);
        heads.emplace(destination, 0);
        return true;
    }

    std::vector<int> forwardPacket() {
        if (queue.empty()) {
            return {};
        }
        // forwarding hands over the oldest packet and drops it from every view
        std::array<int, 3> oldest = queue.front();
        queue.pop_front();
        stored[pairKey(oldest[0], oldest[1])].erase(oldest[2]);
        heads[oldest[1]] += 1;
        return {oldest[0], oldest[1], oldest[2]};
    }

    int getCount(int destination, int startTime, int endTime) {
        auto found = timestamps.find(destination);
        if (found == timestamps.end()) {
            return 0;
        }
        const std::vector<int> &times = found->second;
        // adds arrive with non-decreasing timestamps, so each log is sorted
        // for free and the live entries are the suffix [head, size)
        int head = heads[destination];
        int low = lowerBound(times, head, (int)times.size(), startTime);
        int high = upperBound(times, head, (int)times.size(), endTime);
        return high - low;
    }

  private:
    static long long pairKey(int source, int destination) { return source * 200001LL + destination; }

    static int lowerBound(const std::vector<int> &times, int from, int to, int target) {
        while (from < to) {
            int middle = (from + to) / 2;
            if (times[middle] < target) {
                from = middle + 1;
            } else {
                to = middle;
            }
        }
        return from;
    }

    static int upperBound(const std::vector<int> &times, int from, int to, int target) {
        while (from < to) {
            int middle = (from + to) / 2;
            if (times[middle] <= target) {
                from = middle + 1;
            } else {
                to = middle;
            }
        }
        return from;
    }

    int limit;
    // three parallel views of the stored packets: FIFO order, duplicate
    // detection, and an append-only timestamp log per destination
    std::deque<std::array<int, 3>> queue;
    std::unordered_map<long long, std::unordered_set<int>> stored;
    std::unordered_map<int, std::vector<int>> timestamps;
    std::unordered_map<int, int> heads;
};
