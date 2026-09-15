#include <queue>
#include <unordered_map>
#include <vector>

class NumberContainers {
  public:
    NumberContainers() {}

    void change(int index, int number) {
        auto slot = slots.find(index);
        if (slot != slots.end() && slot->second == number) {
            return;
        }
        slots[index] = number;
        candidates[number].push(index);
    }

    int find(int number) {
        auto found = candidates.find(number);
        if (found == candidates.end()) {
            return -1;
        }
        std::priority_queue<int, std::vector<int>, std::greater<int>> &heap = found->second;
        // the top is the answer unless that index has since been refilled
        while (!heap.empty() && slots[heap.top()] != number) {
            heap.pop();
        }
        return heap.empty() ? -1 : heap.top();
    }

  private:
    // index -> number currently filling it
    std::unordered_map<int, int> slots;
    // number -> every index ever filled with it; stale entries are
    // discarded only when find() reaches them
    std::unordered_map<int, std::priority_queue<int, std::vector<int>, std::greater<int>>> candidates;
};
