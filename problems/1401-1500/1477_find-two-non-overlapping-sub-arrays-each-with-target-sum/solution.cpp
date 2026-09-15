#include <algorithm>
#include <vector>

class Solution {
  public:
    int minSumOfLengths(std::vector<int> &arr, long long target) {
        int n = (int)arr.size();
        const int INF = INT_MAX / 2;
        std::vector<int> best(n, INF);
        int answer = INF;
        int bestSoFar = INF;
        long long windowSum = 0;
        int left = 0;
        for (int right = 0; right < n; right++) {
            windowSum += arr[right];
            while (windowSum > target) {
                windowSum -= arr[left];
                ++left;
            }
            if (windowSum == target) {
                int length = right - left + 1;
                if (left > 0 && best[left - 1] != INF) {
                    answer = std::min(answer, best[left - 1] + length);
                }
                bestSoFar = std::min(bestSoFar, length);
            }
            best[right] = bestSoFar;
        }
        return answer >= INF ? -1 : answer;
    }
};
