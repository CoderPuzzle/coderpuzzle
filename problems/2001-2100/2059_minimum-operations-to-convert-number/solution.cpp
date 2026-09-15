class Solution {
  public:
    int minimumOperations(vector<int> &nums, int start, int goal) {
        vector<int> distance(1001, -1);
        distance[start] = 0;
        queue<int> pending;
        pending.push(start);

        while (!pending.empty()) {
            int value = pending.front();
            pending.pop();
            int nextDistance = distance[value] + 1;
            for (int number : nums) {
                array<int, 3> candidates{value + number, value - number, value ^ number};
                for (int candidate : candidates) {
                    if (candidate == goal)
                        return nextDistance;
                    if (candidate >= 0 && candidate <= 1000 && distance[candidate] == -1) {
                        distance[candidate] = nextDistance;
                        pending.push(candidate);
                    }
                }
            }
        }
        return -1;
    }
};
