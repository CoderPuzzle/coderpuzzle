class Solution {
  public:
    int minLength(string s) {
        string stack;
        for (char ch : s) {
            char prev = stack.empty() ? 0 : stack.back();
            if ((prev == 'A' && ch == 'B') || (prev == 'C' && ch == 'D')) {
                stack.pop_back();
            } else {
                stack.push_back(ch);
            }
        }
        return stack.size();
    }
};
