class Solution {
  public:
    long long maxRatings(vector<vector<int>> &units) {
        if (units[0].size() == 1) {
            long long answer = 0;
            for (auto &device : units)
                answer += device[0];
            return answer;
        }

        int globalMinimum = INT_MAX;
        int smallestSecond = INT_MAX;
        long long secondSum = 0;
        for (auto &device : units) {
            int first = INT_MAX, second = INT_MAX;
            for (int capacity : device) {
                if (capacity < first) {
                    second = first;
                    first = capacity;
                } else if (capacity < second) {
                    second = capacity;
                }
            }
            globalMinimum = min(globalMinimum, first);
            smallestSecond = min(smallestSecond, second);
            secondSum += second;
        }
        return secondSum - smallestSecond + globalMinimum;
    }
};
