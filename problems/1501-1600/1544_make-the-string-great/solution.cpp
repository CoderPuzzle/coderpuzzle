class Solution {
  public:
    string makeGood(string s) {
        // Walk the string once, keeping a stack of characters kept so far.
        // A new character only ever conflicts with the character directly
        // above it on the stack, because anything further down was already
        // separated from it by characters that didn't cancel. So comparing
        // against just the top is enough to reproduce the full repeated
        // removal process in a single pass.
        string stack;
        for (char ch : s) {
            if (!stack.empty() && stack.back() != ch && tolower(stack.back()) == tolower(ch)) {
                stack.pop_back();
            } else {
                stack.push_back(ch);
            }
        }
        return stack;
    }
};
