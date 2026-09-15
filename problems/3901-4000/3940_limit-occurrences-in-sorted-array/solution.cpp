#include <vector>

using namespace std;

class Solution {
  public:
    vector<int> limitOccurrences(vector<int> &nums, int k) {
        vector<int> answer;
        int seen = 0;
        int previous = -1;
        bool hasPrevious = false;
        for (int value : nums) {
            if (!hasPrevious || value != previous) {
                previous = value;
                seen = 0;
                hasPrevious = true;
            }
            if (seen < k) {
                answer.push_back(value);
                ++seen;
            }
        }
        return answer;
    }
};
