#include <complex>
#include <vector>

class Solution {
  public:
    std::vector<long long> multiply(std::vector<int> &poly1, std::vector<int> &poly2) {
        // Schoolbook multiplication is 2.5 * 10^9 products at the constraint
        // limits, so the product is computed with an iterative radix-2 FFT
        // over doubles: pad to a power of two, transform both polynomials,
        // multiply pointwise, transform back, round. Rounding is exact
        // here -- with coefficients bounded by 10^3 and lengths by 5*10^4
        // the largest product coefficient is 5*10^10, and the double-FFT
        // error bound (sum of squared inputs < 9*10^14, here 10^11) keeps
        // the error far below the 0.5 rounding threshold. Results reach
        // 5*10^10, past 32-bit range, so long long is returned.
        int resultLen = poly1.size() + poly2.size() - 1;
        int n = 1;
        while (n < resultLen) {
            n <<= 1;
        }
        std::vector<std::complex<double>> fa(n, {0.0, 0.0});
        std::vector<std::complex<double>> fb(n, {0.0, 0.0});
        for (int i = 0; i < (int)poly1.size(); i++) {
            fa[i] = poly1[i];
        }
        for (int i = 0; i < (int)poly2.size(); i++) {
            fb[i] = poly2[i];
        }
        fft(fa, false, n);
        fft(fb, false, n);
        for (int i = 0; i < n; i++) {
            fa[i] *= fb[i];
        }
        fft(fa, true, n);
        std::vector<long long> result(resultLen);
        for (int i = 0; i < resultLen; i++) {
            result[i] = std::llround(fa[i].real());
        }
        return result;
    }

  private:
    void fft(std::vector<std::complex<double>> &a, bool invert, int n) {
        for (int i = 1, j = 0; i < n; i++) {
            int bit = n >> 1;
            for (; j & bit; bit >>= 1) {
                j ^= bit;
            }
            j |= bit;
            if (i < j) {
                std::swap(a[i], a[j]);
            }
        }
        for (int length = 2; length <= n; length <<= 1) {
            const double pi = std::acos(-1.0);
            double ang = (2 * pi / length) * (invert ? 1 : -1);
            std::complex<double> step(std::cos(ang), std::sin(ang));
            for (int i = 0; i < n; i += length) {
                std::complex<double> w(1);
                for (int k = i; k < i + length / 2; k++) {
                    std::complex<double> u = a[k];
                    std::complex<double> v = a[k + length / 2] * w;
                    a[k] = u + v;
                    a[k + length / 2] = u - v;
                    w *= step;
                }
            }
        }
        if (invert) {
            for (int i = 0; i < n; i++) {
                a[i] /= n;
            }
        }
    }
};
