#include <algorithm>
#include <queue>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
  public:
    int sortArray(vector<int> &nums, vector<int> &pre) {
        vector<int> target = nums;
        sort(target.begin(), target.end());
        if (nums == target)
            return 0;

        queue<vector<int>> queue;
        unordered_map<string, int> distance;
        distance[key(nums)] = 0;
        queue.push(nums);
        while (!queue.empty()) {
            vector<int> state = queue.front();
            queue.pop();
            int current = distance[key(state)];
            for (int length : pre) {
                vector<int> next = state;
                reverse(next.begin(), next.begin() + length);
                if (next == target)
                    return current + 1;
                string nextKey = key(next);
                if (!distance.count(nextKey)) {
                    distance[nextKey] = current + 1;
                    queue.push(next);
                }
            }
        }
        return -1;
    }

  private:
    string key(vector<int> &values) {
        string result;
        for (int value : values) {
            result += to_string(value) + ",";
        }
        return result;
    }
};
