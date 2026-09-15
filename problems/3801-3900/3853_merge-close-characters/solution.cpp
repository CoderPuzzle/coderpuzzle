class Solution {
  public:
    string mergeCharacters(string s, int k) {
        // The stack holds the settled prefix: survivors with no close pair
        // among them. A merge always deletes the right member, so the incoming
        // char — the rightmost — either finds an equal survivor within distance
        // k (its position is stack.size(), so the window is the last k
        // survivors) and vanishes, or it settles on top. One sweep replays
        // the rule.
        string stack;
        for (char c : s) {
            int lo = max(0, (int)stack.size() - k);
            bool absorbed = false;
            for (int j = lo; j < (int)stack.size(); j++) {
                if (stack[j] == c) {
                    absorbed = true;
                    break;
                }
            }
            if (!absorbed) {
                stack.push_back(c);
            }
        }
        return stack;
    }
};
