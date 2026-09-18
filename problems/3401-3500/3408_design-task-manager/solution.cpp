#include <functional>
#include <queue>
#include <tuple>
#include <unordered_map>
#include <utility>
#include <vector>

class TaskManager {
  public:
    TaskManager(std::vector<std::vector<int>> jobs) {
        for (const std::vector<int> &job : jobs) {
            records[job[1]] = {job[2], job[0]};
            heap.push({-job[2], -job[1], job[0]});
        }
    }

    void add(int userId, int jobId, int priority) {
        records[jobId] = {priority, userId};
        heap.push({-priority, -jobId, userId});
    }

    void edit(int jobId, int newPriority) {
        int userId = records[jobId].second;
        records[jobId] = {newPriority, userId};
        heap.push({-newPriority, -jobId, userId});
    }

    void rmv(int jobId) { records.erase(jobId); }

    int execTop() {
        while (!heap.empty()) {
            auto [negativePriority, negativeJob, userId] = heap.top();
            auto record = records.find(-negativeJob);
            // An entry is valid only when its priority still matches the
            // record's current priority; anything else is a stale leftover.
            if (record != records.end() && record->second.first == -negativePriority) {
                heap.pop();
                records.erase(-negativeJob);
                return userId;
            }
            heap.pop();
        }
        return -1;
    }

  private:
    std::unordered_map<int, std::pair<int, int>> records; // jobId -> {priority, userId}
    // Min-order over (-priority, -jobId, userId): the top is the highest
    // priority, tie-broken by the highest jobId.
    std::priority_queue<std::tuple<int, int, int>, std::vector<std::tuple<int, int, int>>,
                        std::greater<std::tuple<int, int, int>>>
        heap;
};
