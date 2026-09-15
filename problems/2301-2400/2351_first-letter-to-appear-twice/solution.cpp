class Solution {
  public:
    string repeatedCharacter(string s) {
        // The first letter to appear twice is exactly the first letter
        // whose second occurrence shows up, so one left-to-right scan with
        // a seen table ends the moment a repeat is met.
        bool seen[26] = {false};
        for (char ch : s) {
            int index = ch - 'a';
            if (seen[index]) {
                return string(1, ch);
            }
            seen[index] = true;
        }
        return "";
    }
};
