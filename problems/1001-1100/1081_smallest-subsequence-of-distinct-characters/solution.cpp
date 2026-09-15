class Solution {
  public:
    string smallestSubsequence(string s) {
        vector<int> last(26, -1);
        for (int i = 0; i < (int)s.size(); i++) {
            last[s[i] - 'a'] = i;
        }
        vector<bool> used(26, false);
        string stack;
        for (int i = 0; i < (int)s.size(); i++) {
            char ch = s[i];
            if (used[ch - 'a']) {
                continue;
            }
            while (!stack.empty() && stack.back() > ch && last[stack.back() - 'a'] > i) {
                used[stack.back() - 'a'] = false;
                stack.pop_back();
            }
            stack.push_back(ch);
            used[ch - 'a'] = true;
        }
        return stack;
    }
};
