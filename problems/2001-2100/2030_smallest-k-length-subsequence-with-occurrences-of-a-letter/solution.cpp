class Solution {
  public:
    string smallestSubsequence(string s, int k, string letter, int repetition) {
        int n = s.size();
        char target = letter[0];
        // suffix[i] = number of `letter` occurrences in s[i:]
        vector<int> suffix(n + 1, 0);
        for (int i = n - 1; i >= 0; --i) {
            suffix[i] = suffix[i + 1] + (s[i] == target ? 1 : 0);
        }

        string stack;
        int used = 0; // number of `letter` currently in the stack
        for (int i = 0; i < n; ++i) {
            char ch = s[i];
            while (!stack.empty()) {
                char top = stack.back();
                if (top <= ch) {
                    break;
                }
                if ((int)stack.size() - 1 + (n - i) < k) {
                    break;
                }
                int lettersAfterPop = used - (top == target ? 1 : 0);
                lettersAfterPop += (ch == target ? 1 : 0);
                if (lettersAfterPop + suffix[i + 1] < repetition) {
                    break;
                }
                stack.pop_back();
                if (top == target) {
                    --used;
                }
            }
            stack.push_back(ch);
            if (ch == target) {
                ++used;
            }
        }

        // Trim to exactly length k from the right, never dropping below
        // `repetition` target letters.
        int remove = (int)stack.size() - k;
        int lettersInStack = used;
        string res;
        for (int p = (int)stack.size() - 1; p >= 0; --p) {
            char ch = stack[p];
            if (remove == 0) {
                res.push_back(ch);
            } else if (ch == target) {
                if (lettersInStack - 1 >= repetition) {
                    --lettersInStack;
                    --remove;
                } else {
                    res.push_back(ch);
                }
            } else {
                --remove;
            }
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
