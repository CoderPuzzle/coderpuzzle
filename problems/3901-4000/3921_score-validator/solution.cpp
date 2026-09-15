#include <string>
#include <vector>

using namespace std;

class Solution {
  public:
    vector<int> scoreValidator(vector<string> &events) {
        // Single left-to-right pass. Only "W" moves the counter, so it alone
        // can trigger the stop-at-10 rule; scoring events never stop anything.
        int score = 0;
        int counter = 0;
        for (const string &event : events) {
            if (event == "W")
                ++counter;
            else if (event == "WD" || event == "NB")
                ++score;
            else
                score += event[0] - '0';
            // Events after the counter reaches 10 are ignored entirely.
            if (counter == 10)
                break;
        }
        return {score, counter};
    }
};
