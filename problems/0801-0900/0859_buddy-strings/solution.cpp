class Solution {
  public:
    bool buddyStrings(string s, string goal) {
        // A swap moves exactly two letters, so it changes two positions of s
        // or, when the letters are equal, nothing at all. Count the positions
        // where s and goal disagree: exactly two that cross, or none with a
        // repeated letter to trade.
        if (s.size() != goal.size())
            return false;
        int n = (int)s.size();
        int first = -1, second = -1;
        for (int i = 0; i < n; i++) {
            if (s[i] != goal[i]) {
                if (first == -1)
                    first = i;
                else if (second == -1)
                    second = i;
                else
                    return false;
            }
        }
        if (second != -1) {
            return s[first] == goal[second] && s[second] == goal[first];
        }
        if (first != -1)
            return false;
        bool seen[26] = {false};
        for (int i = 0; i < n; i++) {
            int k = s[i] - 'a';
            if (seen[k])
                return true;
            seen[k] = true;
        }
        return false;
    }
};
