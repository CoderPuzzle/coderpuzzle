#include <string>

class Solution {
  public:
    string trafficSignal(int timer) {
        // The three signal states are exact conditions on the remaining
        // seconds: Green only at 0, Orange only at 30, Red strictly inside
        // (30, 90]; anything else is Invalid.
        if (timer == 0)
            return "Green";
        if (timer == 30)
            return "Orange";
        if (30 < timer && timer <= 90)
            return "Red";
        return "Invalid";
    }
};
