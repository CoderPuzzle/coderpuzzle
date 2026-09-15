class Solution {
  public:
    int maxTaskAssign(vector<int> &tasks, vector<int> &workers, int pills, int strength) {
        sort(tasks.begin(), tasks.end());
        sort(workers.begin(), workers.end());
        int low = 0;
        int high = min(tasks.size(), workers.size()) + 1;
        while (low + 1 < high) {
            int middle = low + (high - low) / 2;
            if (feasible(tasks, workers, pills, strength, middle)) {
                low = middle;
            } else {
                high = middle;
            }
        }
        return low;
    }

  private:
    bool feasible(const vector<int> &tasks, const vector<int> &workers, int pills, int strength, int count) const {
        deque<int> available;
        int taskIndex = 0;
        for (int workerIndex = static_cast<int>(workers.size()) - count; workerIndex < static_cast<int>(workers.size());
             ++workerIndex) {
            int worker = workers[workerIndex];
            while (taskIndex < count && tasks[taskIndex] <= static_cast<long long>(worker) + strength) {
                available.push_back(tasks[taskIndex++]);
            }
            if (available.empty()) {
                return false;
            }
            if (available.front() <= worker) {
                available.pop_front();
            } else {
                if (pills == 0) {
                    return false;
                }
                --pills;
                available.pop_back();
            }
        }
        return true;
    }
};
