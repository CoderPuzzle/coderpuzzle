class Solution {
  public:
    vector<string> letterCombinations(string digits) {
        // 2..9 map to consecutive group slots; 1 and 0 have no letters.
        static const string groups[8] = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        // Zero digits means zero combinations: [] (not [""]), and the walk
        // below must never start on an empty tree.
        if (digits.empty()) {
            return {};
        }
        vector<string> combinations;
        string current;
        walk(digits, groups, 0, current, combinations);
        return combinations;
    }

  private:
    void walk(const string &digits, const string *groups, int position, string &current, vector<string> &combinations) {
        // A leaf is a complete root-to-leaf path: one letter per digit.
        if (position == (int)digits.size()) {
            combinations.push_back(current);
            return;
        }
        const string &group = groups[digits[position] - '2'];
        // Visit letters in group order so earlier digits vary slowest.
        for (char letter : group) {
            current.push_back(letter);
            walk(digits, groups, position + 1, current, combinations);
            current.pop_back();
        }
    }
};
