#include <queue>
#include <unordered_map>
#include <vector>

class FirstUnique {
  public:
    FirstUnique(std::vector<long long> nums) {
        for (long long value : nums) {
            add(value);
        }
    }

    long long showFirstUnique() {
        while (!pending.empty() && counts[pending.front()] > 1) {
            pending.pop();
        }
        return pending.empty() ? -1 : pending.front();
    }

    void add(long long value) {
        counts[value] += 1;
        pending.push(value);
    }

  private:
    std::unordered_map<long long, int> counts;
    std::queue<long long> pending;
};
