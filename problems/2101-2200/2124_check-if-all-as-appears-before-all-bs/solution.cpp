class Solution {
  public:
    bool checkString(string s) {
        bool seenB = false;
        for (char character : s) {
            if (character == 'b') {
                seenB = true;
            } else if (seenB) {
                return false;
            }
        }
        return true;
    }
};
