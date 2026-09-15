#include <string>

using namespace std;

class Solution {
  public:
    int passwordStrength(string password) {
        bool lower[26] = {};
        bool upper[26] = {};
        bool digit[10] = {};
        bool special[4] = {};
        string specials = "!@#$";
        for (char value : password) {
            if (value >= 'a' && value <= 'z')
                lower[value - 'a'] = true;
            else if (value >= 'A' && value <= 'Z')
                upper[value - 'A'] = true;
            else if (value >= '0' && value <= '9')
                digit[value - '0'] = true;
            else {
                size_t index = specials.find(value);
                if (index != string::npos)
                    special[index] = true;
            }
        }
        int answer = 0;
        for (bool present : lower)
            if (present)
                ++answer;
        for (bool present : upper)
            if (present)
                answer += 2;
        for (bool present : digit)
            if (present)
                answer += 3;
        for (bool present : special)
            if (present)
                answer += 5;
        return answer;
    }
};
