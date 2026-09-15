class Solution {
  public:
    string finalString(string s) {
        // Type characters into one growing buffer: letters append, and each
        // 'i' reverses everything typed so far. After the last keystroke the
        // buffer is exactly the laptop screen.
        string screen;
        for (char c : s) {
            if (c == 'i') {
                reverse(screen.begin(), screen.end());
            } else {
                screen.push_back(c);
            }
        }
        return screen;
    }
};
