#include <vector>

class Solution {
  public:
    int busyStudent(std::vector<int> &startTime, std::vector<int> &endTime, int queryTime) {
        int count = 0;
        for (int i = 0; i < (int)startTime.size(); i++) {
            if (startTime[i] <= queryTime && queryTime <= endTime[i]) {
                count++;
            }
        }
        return count;
    }
};
