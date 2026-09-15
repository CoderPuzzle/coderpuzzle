class Solution {
  public:
    string getSmallestString(string s, int k) {
        // Greedy per position: the smallest feasible letter is 'a' when its
        // cyclic distance still fits the budget; otherwise every smaller
        // letter is out of reach and exactly `budget` steps down from s[i]
        // is the first affordable letter.
        string result;
        result.reserve(s.size());
        int budget = k;
        for (char ch : s) {
            int step = ch - 'a';
            int toA = min(step, 26 - step);
            if (toA <= budget) {
                result.push_back('a');
                budget -= toA;
            } else {
                result.push_back(static_cast<char>(ch - budget));
                budget = 0;
            }
        }
        return result;
    }
};
