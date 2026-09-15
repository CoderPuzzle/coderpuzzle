#include <string>

using namespace std;

class Solution {
  public:
    int secondsBetweenTimes(string startTime, string endTime) { return seconds(endTime) - seconds(startTime); }

  private:
    int seconds(const string &value) {
        int hours = (value[0] - '0') * 10 + (value[1] - '0');
        int minutes = (value[3] - '0') * 10 + (value[4] - '0');
        int seconds = (value[6] - '0') * 10 + (value[7] - '0');
        return hours * 3600 + minutes * 60 + seconds;
    }
};
