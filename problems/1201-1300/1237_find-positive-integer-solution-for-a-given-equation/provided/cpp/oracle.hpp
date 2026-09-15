// Problem-provided oracle (the hidden f(x, y) wire). The wrapper constructs
// the oracle from its tagged case value (function_id) plus the query
// budget. Evaluated in long long so the largest formula (x^3 + y^3 at the
// 1000 x 1000 corner, 2e9) stays exact inside i32.
class CustomFunction {
  public:
    CustomFunction(const OjValue& functionId, long long budget) : budget_(budget) {
        function_id_ = static_cast<int>(functionId.integer);
    }

    // Returns some positive integer f(x, y) for two positive integers x and
    // y based on a formula.
    int f(int x, int y) {
        if (budget_ <= 0) throw std::runtime_error("Oracle query budget exhausted");
        --budget_;
        long long a = x;
        long long b = y;
        long long value;
        switch (function_id_) {
            case 1: value = a + b; break;
            case 2: value = a * b; break;
            case 3: value = a * a + b; break;
            case 4: value = a + b * b; break;
            case 5: value = a * a + b * b; break;
            case 6: value = 10 * a + b; break;
            case 7: value = a * a * a + b * b * b; break;
            case 8: value = (a + b) * (a + b); break;
            case 9: value = a * b + a + b; break;
            default: throw std::runtime_error("Unknown function_id");
        }
        return static_cast<int>(value);
    }

  private:
    int function_id_;
    long long budget_;
};
