class Solution {
  public:
    string decodeString(string s) {
        // One (previous_string, repeat_count) frame per unclosed '[' —
        // the stack mirrors the bracket structure, so context is never
        // lost no matter how deep the nesting goes.
        vector<pair<string, int>> stack;
        string current;
        int repeat = 0;
        for (char ch : s) {
            if (ch >= '0' && ch <= '9') {
                // Multi-digit counts assemble digit by digit.
                repeat = repeat * 10 + (ch - '0');
            } else if (ch == '[') {
                // Park the outer segment and its count; reset both for
                // the fresh inner segment.
                stack.emplace_back(current, repeat);
                current.clear();
                repeat = 0;
            } else if (ch == ']') {
                // Absorb the finished inner segment: restore the outer
                // string, then repeat-and-append onto it.
                auto [previous, times] = stack.back();
                stack.pop_back();
                current = previous + buildRepeat(current, times);
            } else {
                current.push_back(ch);
            }
        }
        // Every bracket is closed, so the stack is empty and current is
        // the fully decoded string.
        return current;
    }

  private:
    string buildRepeat(const string &part, int times) {
        string out;
        out.reserve(part.size() * times);
        for (int t = 0; t < times; t++) {
            out += part;
        }
        return out;
    }
};
