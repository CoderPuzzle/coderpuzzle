class Solution {

    public long[] multiply(int[] poly1, int[] poly2) {
        // Schoolbook multiplication is 2.5 * 10^9 products at the constraint
        // limits, so the product is computed with an iterative radix-2 FFT
        // over doubles (flat re/im arrays): pad to a power of two, transform
        // both polynomials, multiply pointwise, transform back, round.
        // Rounding is exact here -- with coefficients bounded by 10^3 and
        // lengths by 5*10^4 the largest product coefficient is 5*10^10, and
        // the double-FFT error bound (sum of squared inputs < 9*10^14, here
        // 10^11) keeps the error far below the 0.5 rounding threshold.
        // Results reach 5*10^10, past 32-bit range, so long[] is returned.
        int resultLen = poly1.length + poly2.length - 1;
        int n = 1;
        while (n < resultLen) {
            n <<= 1;
        }
        double[] fre = new double[n];
        double[] fim = new double[n];
        double[] gre = new double[n];
        double[] gim = new double[n];
        for (int i = 0; i < poly1.length; i++) {
            fre[i] = poly1[i];
        }
        for (int i = 0; i < poly2.length; i++) {
            gre[i] = poly2[i];
        }
        fft(fre, fim, false, n);
        fft(gre, gim, false, n);
        for (int i = 0; i < n; i++) {
            double re = fre[i] * gre[i] - fim[i] * gim[i];
            fim[i] = fre[i] * gim[i] + fim[i] * gre[i];
            fre[i] = re;
        }
        fft(fre, fim, true, n);
        long[] result = new long[resultLen];
        for (int i = 0; i < resultLen; i++) {
            result[i] = Math.round(fre[i]);
        }
        return result;
    }

    private void fft(double[] re, double[] im, boolean invert, int n) {
        for (int i = 1, j = 0; i < n; i++) {
            int bit = n >> 1;
            for (; (j & bit) != 0; bit >>= 1) {
                j ^= bit;
            }
            j |= bit;
            if (i < j) {
                double t = re[i];
                re[i] = re[j];
                re[j] = t;
                t = im[i];
                im[i] = im[j];
                im[j] = t;
            }
        }
        for (int length = 2; length <= n; length <<= 1) {
            double ang = ((2 * Math.PI) / length) * (invert ? 1 : -1);
            double wr = Math.cos(ang);
            double wi = Math.sin(ang);
            for (int i = 0; i < n; i += length) {
                double wRe = 1;
                double wIm = 0;
                for (int k = i; k < i + length / 2; k++) {
                    int r = k + length / 2;
                    double uRe = re[k];
                    double uIm = im[k];
                    double vRe = re[r] * wRe - im[r] * wIm;
                    double vIm = re[r] * wIm + im[r] * wRe;
                    re[k] = uRe + vRe;
                    im[k] = uIm + vIm;
                    re[r] = uRe - vRe;
                    im[r] = uIm - vIm;
                    double tw = wRe * wr - wIm * wi;
                    wIm = wRe * wi + wIm * wr;
                    wRe = tw;
                }
            }
        }
        if (invert) {
            for (int i = 0; i < n; i++) {
                re[i] /= n;
                im[i] /= n;
            }
        }
    }
}
