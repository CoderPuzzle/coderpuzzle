class Solution {
  public:
    int maximumGain(string s, int x, int y) {
        // Remove the higher-priced pattern first: by exchange, the character
        // left behind still pairs with the other kind, so this never loses.
        if (x >= y) {
            auto first = removePairs(s, 'a', 'b', x);
            auto second = removePairs(first.second, 'b', 'a', y);
            return first.first + second.first;
        }
        auto first = removePairs(s, 'b', 'a', y);
        auto second = removePairs(first.second, 'a', 'b', x);
        return first.first + second.first;
    }

  private:
    pair<int, string> removePairs(const string &text, char first, char second, int points) {
        // Stack scan: `second` arriving on a top of `first` pops and scores;
        // everything else is pushed. Survivors are the text with every
        // non-overlapping removal of this pattern applied.
        string stack;
        int score = 0;
        for (char c : text) {
            if (!stack.empty() && stack.back() == first && c == second) {
                stack.pop_back();
                score += points;
            } else {
                stack.push_back(c);
            }
        }
        // The residue — including non-a/b characters, which never pair — is
        // exactly what the other pattern's pass sweeps next.
        return {score, stack};
    }
};
