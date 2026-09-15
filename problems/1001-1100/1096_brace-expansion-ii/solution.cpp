class Solution {
  public:
    vector<string> braceExpansionII(string expression) {
        // Iterative stack machine. `cur` holds the words of the
        // concatenation so far; a '{' pushes it as a saved prefix and
        // starts a group whose comma-separated alternatives accumulate in
        // a union slot (an empty set marks "no alternatives yet"); a '}'
        // closes the group and concatenates its union onto the prefix.
        vector<set<string>> stack;
        set<string> cur{""};
        for (char c : expression) {
            if (c == '{') {
                stack.push_back(cur);
                stack.push_back({}); // group union slot
                cur = {""};
            } else if (c == ',') {
                set<string> &slot = stack.back();
                if (slot.empty()) {
                    slot = cur;
                } else {
                    slot.insert(cur.begin(), cur.end());
                }
                cur = {""};
            } else if (c == '}') {
                set<string> group = stack.back();
                stack.pop_back();
                if (group.empty()) {
                    group = cur;
                } else {
                    group.insert(cur.begin(), cur.end());
                }
                set<string> prev = stack.back();
                stack.pop_back();
                set<string> next;
                for (const auto &a : prev) {
                    for (const auto &b : group)
                        next.insert(a + b);
                }
                cur = move(next);
            } else {
                set<string> next;
                for (const auto &w : cur)
                    next.insert(w + c);
                cur = move(next);
            }
        }
        return vector<string>(cur.begin(), cur.end());
    }
};
