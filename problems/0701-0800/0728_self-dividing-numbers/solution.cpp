class Solution {
  public:
    vector<int> selfDividingNumbers(int left, int right) {
        // Each candidate is judged on a copy: peeling digits off the tail
        // with %10 and /10 walks the decimal writing from last digit to
        // first while n itself stays intact for the divisibility test. A
        // digit of 0 rejects on sight — it divides nothing, and the
        // statement bars it anyway — and any digit leaving a remainder in
        // n % d rejects too; survivors append in scan order, which is
        // already ascending.
        vector<int> answer;
        for (int n = left; n <= right; ++n) {
            int m = n;
            bool ok = true;
            while (m > 0) {
                int d = m % 10;
                if (d == 0 || n % d != 0) {
                    ok = false;
                    break;
                }
                m /= 10;
            }
            if (ok) {
                answer.push_back(n);
            }
        }
        return answer;
    }
};
