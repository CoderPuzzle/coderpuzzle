class Solution {
  public:
    string abbreviateProduct(int left, int right) {
        const long long modulus = 10000000000LL;
        long double logarithm = 0.0L;
        int twos = 0;
        int fives = 0;
        long long suffix = 1;

        for (int value = left; value <= right; value++) {
            logarithm += log10(static_cast<long double>(value));
            int remaining = value;
            while (remaining % 2 == 0) {
                twos++;
                remaining /= 2;
            }
            while (remaining % 5 == 0) {
                fives++;
                remaining /= 5;
            }
            suffix = suffix * remaining % modulus;
        }

        int zeros = min(twos, fives);
        for (int count = zeros; count < twos; count++) {
            suffix = suffix * 2 % modulus;
        }
        for (int count = zeros; count < fives; count++) {
            suffix = suffix * 5 % modulus;
        }

        long double adjustedLogarithm = logarithm - zeros;
        int digits = static_cast<int>(floor(adjustedLogarithm)) + 1;
        if (digits <= 10) {
            return to_string(suffix) + "e" + to_string(zeros);
        }

        long double fractional = adjustedLogarithm - floor(adjustedLogarithm);
        int prefix = static_cast<int>(floor(pow(10.0L, fractional + 4)));
        ostringstream result;
        result << prefix << "..." << setw(5) << setfill('0') << suffix % 100000 << "e" << zeros;
        return result.str();
    }
};
