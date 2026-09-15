class Solution {
  public:
    int clumsy(int n) {
        // The rotation is *, /, +, - repeating. * and / bind tighter, so they
        // only ever fold into the term on top of the stack; + and - always
        // start a fresh term (pushed with its own sign already applied).
        vector<int> stack = {n};
        int opIdx = 0;
        for (int i = n - 1; i >= 1; i--) {
            int op = opIdx % 4;
            opIdx++;
            if (op == 0) {
                stack.back() *= i;
            } else if (op == 1) {
                // C++'s / already truncates toward zero, which is exactly
                // what a prior '-' push carrying its sign into this division
                // needs: no separate floor-vs-truncate handling required.
                stack.back() /= i;
            } else if (op == 2) {
                stack.push_back(i);
            } else {
                stack.push_back(-i);
            }
        }
        int total = 0;
        for (int term : stack)
            total += term;
        return total;
    }
};
