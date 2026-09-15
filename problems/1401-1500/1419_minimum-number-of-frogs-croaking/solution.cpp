#include <string>

class Solution {
  public:
    int minNumberOfFrogs(std::string croakOfFrogs) {
        const std::string order = "croak";
        int counts[5] = {0, 0, 0, 0, 0};
        int active = 0;
        int answer = 0;
        for (char ch : croakOfFrogs) {
            size_t index = order.find(ch);
            if (index == std::string::npos) {
                return -1;
            }
            if (index == 0) {
                counts[0]++;
                active++;
                answer = std::max(answer, active);
            } else {
                if (counts[index - 1] == 0) {
                    return -1;
                }
                counts[index - 1]--;
                counts[index]++;
                if (index == 4) {
                    active--;
                }
            }
        }
        for (int i = 0; i < 4; i++) {
            if (counts[i] != 0) {
                return -1;
            }
        }
        return answer;
    }
};
