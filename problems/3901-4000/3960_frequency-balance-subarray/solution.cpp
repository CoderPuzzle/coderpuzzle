#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
  public:
    int getLength(vector<int> &nums) {
        int n = (int)nums.size();
        int best = 1;
        for (int left = 0; left < n; ++left) {
            unordered_map<int, int> counts;
            vector<int> frequencyGroups(n + 1);
            int levelCount = 0;
            int levelSum = 0;
            int levelSquareSum = 0;

            for (int right = left; right < n; ++right) {
                int value = nums[right];
                int oldFrequency = counts[value];
                if (oldFrequency > 0) {
                    --frequencyGroups[oldFrequency];
                    if (frequencyGroups[oldFrequency] == 0) {
                        --levelCount;
                        levelSum -= oldFrequency;
                        levelSquareSum -= oldFrequency * oldFrequency;
                    }
                }

                int newFrequency = oldFrequency + 1;
                if (frequencyGroups[newFrequency] == 0) {
                    ++levelCount;
                    levelSum += newFrequency;
                    levelSquareSum += newFrequency * newFrequency;
                }
                ++frequencyGroups[newFrequency];
                counts[value] = newFrequency;

                bool balanced = counts.size() == 1;
                if (levelCount == 2 && levelSum % 3 == 0) {
                    int lower = levelSum / 3;
                    balanced = levelSquareSum == 5 * lower * lower;
                }
                if (balanced)
                    best = max(best, right - left + 1);
            }
        }
        return best;
    }
};
