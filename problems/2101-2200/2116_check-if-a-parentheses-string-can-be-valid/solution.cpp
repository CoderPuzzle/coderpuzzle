class Solution {
  public:
    bool canBeValid(string s, string locked) {
        if (s.size() % 2 == 1) {
            return false;
        }
        int minimum = 0;
        int maximum = 0;
        for (int index = 0; index < static_cast<int>(s.size()); ++index) {
            if (locked[index] == '0') {
                --minimum;
                ++maximum;
            } else if (s[index] == '(') {
                ++minimum;
                ++maximum;
            } else {
                --minimum;
                --maximum;
            }
            if (maximum < 0) {
                return false;
            }
            minimum = max(minimum, 0);
        }
        return minimum == 0;
    }
};
