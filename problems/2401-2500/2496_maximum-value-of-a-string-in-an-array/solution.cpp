class Solution {
  public:
    int maximumValue(vector<string> &strs) {
        // Digits-only strings count as their base-10 numeric value
        // (leading zeros fold away in the parse); everything else counts
        // by length. Nine digits stay inside int's range.
        int best = 0;
        for (const string &s : strs) {
            bool digitsOnly = true;
            for (char c : s) {
                if (c < '0' || c > '9') {
                    digitsOnly = false;
                    break;
                }
            }
            int value = digitsOnly ? stoi(s) : (int)s.size();
            best = max(best, value);
        }
        return best;
    }
};
