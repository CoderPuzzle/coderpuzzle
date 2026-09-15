class Solution {
  public:
    vector<string> removeInvalidParentheses(string s) {
        auto isValid = [](const string &str) {
            // Balance scan: fail as soon as a ')' has no '(' to match,
            // and require the counter to end back at zero.
            int count = 0;
            for (char ch : str) {
                if (ch == '(')
                    count++;
                else if (ch == ')') {
                    count--;
                    if (count < 0)
                        return false;
                }
            }
            return count == 0;
        };
        // BFS over removal counts: every string in a level has had the
        // same number of characters deleted, so the first level holding
        // any valid string is exactly the minimum-removal answer.
        unordered_set<string> level;
        level.insert(s);
        while (true) {
            vector<string> valid;
            for (const string &item : level) {
                if (isValid(item))
                    valid.push_back(item);
            }
            if (!valid.empty()) {
                // Sorted for deterministic output.
                sort(valid.begin(), valid.end());
                return valid;
            }
            // Expand one more deletion; only parentheses are removed and
            // the set dedups deletions that produce the same string.
            unordered_set<string> next;
            for (const string &item : level) {
                for (int i = 0; i < (int)item.size(); i++) {
                    char ch = item[i];
                    if (ch == '(' || ch == ')') {
                        next.insert(item.substr(0, i) + item.substr(i + 1));
                    }
                }
            }
            level = std::move(next);
        }
    }
};
