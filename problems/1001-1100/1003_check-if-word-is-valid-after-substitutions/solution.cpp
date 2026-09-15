class Solution {
  public:
    bool isValid(string s) {
        // Every insertion of "abc" is reversible: removing an "abc"
        // substring from a valid string leaves another valid string, all
        // the way back to "". A stack turns that reversal into one pass —
        // whenever the top three entries read a, b, c, they are the most
        // recently completed insertion, so popping all three undoes it.
        string stack;
        for (char character : s) {
            stack.push_back(character);
            size_t top = stack.size();
            if (top >= 3 && stack[top - 3] == 'a' && stack[top - 2] == 'b' && stack[top - 1] == 'c') {
                stack.resize(top - 3);
            }
        }
        // s was reachable by the operation iff nothing is left over.
        return stack.empty();
    }
};
