class Solution {
  public:
    int calculate(string s) {
        int i = 0;
        return (int)expr(s, i);
    }

  private:
    long long expr(const string &s, int &i) {
        long long value = term(s, i);
        while (i < (int)s.size() && (s[i] == '+' || s[i] == '-')) {
            char op = s[i];
            i++;
            long long rhs = term(s, i);
            value = op == '+' ? value + rhs : value - rhs;
        }
        return value;
    }

    long long term(const string &s, int &i) {
        long long value = factor(s, i);
        while (i < (int)s.size() && (s[i] == '*' || s[i] == '/')) {
            char op = s[i];
            i++;
            long long rhs = factor(s, i);
            value = op == '*' ? value * rhs : value / rhs;
        }
        return value;
    }

    long long factor(const string &s, int &i) {
        if (s[i] == '(') {
            i++;
            long long value = expr(s, i);
            i++; // closing ')'
            return value;
        }
        long long value = 0;
        while (i < (int)s.size() && s[i] >= '0' && s[i] <= '9') {
            value = value * 10 + (s[i] - '0');
            i++;
        }
        return value;
    }
};
