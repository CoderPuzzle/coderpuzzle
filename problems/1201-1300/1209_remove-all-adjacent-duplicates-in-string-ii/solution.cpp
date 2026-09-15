class Solution {
  public:
    string removeDuplicates(string s, int k) {
        vector<pair<char, int>> stack; // (char, count)
        for (char ch : s) {
            if (!stack.empty() && stack.back().first == ch) {
                if (++stack.back().second == k) {
                    stack.pop_back();
                }
            } else {
                stack.push_back({ch, 1});
            }
        }
        string out;
        out.reserve(s.size());
        for (auto &[ch, count] : stack) {
            out.append(count, ch);
        }
        return out;
    }
};
