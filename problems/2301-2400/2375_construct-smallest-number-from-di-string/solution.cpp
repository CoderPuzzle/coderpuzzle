class Solution {
  public:
    string smallestNumber(string pattern) {
        int n = pattern.size();
        string result;
        result.reserve(n + 1);
        string stack;
        for (int i = 0; i <= n; i++) {
            // Push 1, 2, 3, ... while inside a 'D' run; the run's positions
            // get consecutive digits, the smallest possible pool.
            stack.push_back(char('1' + i));
            // An 'I' (or the end) terminates the current 'D' block; popping
            // emits the block's digits in descending order, satisfying 'D'.
            if (i == n || pattern[i] == 'I') {
                while (!stack.empty()) {
                    result.push_back(stack.back());
                    stack.pop_back();
                }
            }
        }
        return result;
    }
};
