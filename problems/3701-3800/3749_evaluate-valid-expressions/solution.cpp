class Solution {
  public:
    // Intermediate values reach ~2^62, so the whole pipeline is 64-bit.
    long long evaluateExpression(string expression) {
        int pos = 0;
        return parse(expression, pos);
    }

  private:
    // One recursive descent covers the grammar; each call returns the value
    // and advances pos just past what it consumed.
    long long parse(const string &expr, int &pos) {
        char ch = expr[pos];
        // A digit or '-' starts a literal: optional sign, then digits.
        if (ch == '-' || (ch >= '0' && ch <= '9')) {
            int i = pos;
            int j = ch == '-' ? i + 1 : i;
            while (j < (int)expr.size() && expr[j] >= '0' && expr[j] <= '9') {
                j++;
            }
            pos = j;
            return stoll(expr.substr(i, j - i));
        }
        // Otherwise a three-letter operator; +=4 lands just past "op(".
        string op = expr.substr(pos, 3);
        pos += 4;
        long long a = parse(expr, pos);
        pos++; // skip ","
        long long b = parse(expr, pos);
        pos++; // skip ")"
        // Apply the operator to the two sub-results as the recursion unwinds.
        if (op == "add")
            return a + b;
        if (op == "sub")
            return a - b;
        if (op == "mul")
            return a * b;
        return a / b;
    }
};
