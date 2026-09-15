class Solution {
  public:
    string solveEquation(string equation) {
        // Split at the one '=' and reduce each side to a*x + b with a single
        // scan. A term is an optional sign, digits (empty before an 'x' means
        // coefficient 1), and a possible trailing 'x'; '0x' contributes a zero
        // coefficient and drops out by itself.
        size_t eq = equation.find('=');
        auto left = parse(equation, 0, eq);
        auto right = parse(equation, eq + 1, equation.size());
        // la*x + lb = ra*x + rb -> (la - ra)*x = rb - lb. A zero coefficient
        // leaves either every x or no x; otherwise the division is exact.
        long long a = left.first - right.first;
        long long b = right.second - left.second;
        if (a == 0) {
            return b == 0 ? "Infinite solutions" : "No solution";
        }
        return "x=" + to_string(b / a);
    }

  private:
    pair<long long, long long> parse(const string &side, size_t from, size_t to) {
        long long a = 0, b = 0;
        size_t i = from;
        while (i < to) {
            long long sign = 1;
            char mark = side[i];
            if (mark == '+' || mark == '-') {
                sign = mark == '-' ? -1 : 1;
                i++;
            }
            long long value = 0;
            bool hasDigits = false;
            while (i < to && side[i] >= '0' && side[i] <= '9') {
                value = value * 10 + (side[i] - '0');
                hasDigits = true;
                i++;
            }
            if (i < to && side[i] == 'x') {
                a += sign * (hasDigits ? value : 1);
                i++;
            } else {
                b += sign * value;
            }
        }
        return {a, b};
    }
};
