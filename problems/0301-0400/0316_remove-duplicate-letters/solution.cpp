class Solution {
  public:
    string removeDuplicateLetters(string s) {
        // count[c] = occurrences of c strictly after the current position.
        array<int, 26> count{};
        for (char ch : s)
            count[ch - 'a']++;
        string stack;
        array<bool, 26> inStack{};
        for (char ch : s) {
            int c = ch - 'a';
            count[c]--;
            // A letter already placed stays put: a second copy can never help.
            if (inStack[c])
                continue;
            // Local exchange: popping a larger top is safe exactly while it
            // still re-occurs later (count > 0), and only shrinks the prefix.
            while (!stack.empty()) {
                int top = stack.back() - 'a';
                if (top > c && count[top] > 0) {
                    inStack[top] = false;
                    stack.pop_back();
                } else {
                    break;
                }
            }
            stack.push_back(ch);
            inStack[c] = true;
        }
        return stack;
    }
};
