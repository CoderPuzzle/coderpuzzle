class Solution {
  public:
    long long buildAndEvaluate(string s) {
        text = s;
        pos = 0;
        return parseExpr();
    }

  private:
    string text;
    int pos;

    long long parseExpr() {
        long long value = parseTerm();
        while (pos < (int)text.size() && (text[pos] == '+' || text[pos] == '-')) {
            char op = text[pos];
            pos++;
            long long rhs = parseTerm();
            value = op == '+' ? value + rhs : value - rhs;
        }
        return value;
    }

    long long parseTerm() {
        long long value = parseFactor();
        while (pos < (int)text.size() && (text[pos] == '*' || text[pos] == '/')) {
            char op = text[pos];
            pos++;
            long long rhs = parseFactor();
            value = op == '*' ? value * rhs : value / rhs;
        }
        return value;
    }

    long long parseFactor() {
        if (text[pos] == '(') {
            pos++;
            long long value = parseExpr();
            pos++; // skip ')'
            return value;
        }
        long long value = text[pos] - '0';
        pos++;
        return value;
    }
};
