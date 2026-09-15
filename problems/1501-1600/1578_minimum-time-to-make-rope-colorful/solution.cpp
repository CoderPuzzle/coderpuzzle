class Solution {
  public:
    int minCost(string colors, vector<int> &neededTime) {
        int total = 0;
        int runSum = neededTime[0];
        int runMax = neededTime[0];
        for (int i = 1; i < (int)colors.size(); i++) {
            if (colors[i] == colors[i - 1]) {
                runSum += neededTime[i];
                runMax = max(runMax, neededTime[i]);
            } else {
                total += runSum - runMax;
                runSum = neededTime[i];
                runMax = neededTime[i];
            }
        }
        total += runSum - runMax;
        return total;
    }
};
