function multiply(poly1: number[], poly2: number[]): number[] {
    // Schoolbook multiplication is 2.5 * 10^9 products at the constraint
    // limits, so the product is computed with an iterative radix-2 FFT
    // over doubles (flat re/im arrays): pad to a power of two, transform
    // both polynomials, multiply pointwise, transform back, round.
    // Rounding is exact here -- with coefficients bounded by 10^3 and
    // lengths by 5*10^4 the largest product coefficient is 5*10^10, and
    // the double-FFT error bound (sum of squared inputs < 9*10^14, here
    // 10^11) keeps the error far below the 0.5 rounding threshold.
    // Results reach 5*10^10: exact as a double (below 2^53) but past
    // 32-bit range, hence the 64-bit wire type.
    const resultLen = poly1.length + poly2.length - 1;
    let n = 1;
    while (n < resultLen) {
        n <<= 1;
    }
    const fre = new Float64Array(n);
    const fim = new Float64Array(n);
    const gre = new Float64Array(n);
    const gim = new Float64Array(n);
    for (let i = 0; i < poly1.length; i++) {
        fre[i] = poly1[i];
    }
    for (let i = 0; i < poly2.length; i++) {
        gre[i] = poly2[i];
    }
    const fft = (re: Float64Array, im: Float64Array, invert: boolean): void => {
        for (let i = 1, j = 0; i < n; i++) {
            let bit = n >> 1;
            for (; j & bit; bit >>= 1) {
                j ^= bit;
            }
            j |= bit;
            if (i < j) {
                [re[i], re[j]] = [re[j], re[i]];
                [im[i], im[j]] = [im[j], im[i]];
            }
        }
        for (let length = 2; length <= n; length <<= 1) {
            const ang = ((2 * Math.PI) / length) * (invert ? 1 : -1);
            const wr = Math.cos(ang);
            const wi = Math.sin(ang);
            for (let i = 0; i < n; i += length) {
                let wRe = 1;
                let wIm = 0;
                for (let k = i; k < i + length / 2; k++) {
                    const uRe = re[k];
                    const uIm = im[k];
                    const vRe = re[k + length / 2] * wRe - im[k + length / 2] * wIm;
                    const vIm = re[k + length / 2] * wIm + im[k + length / 2] * wRe;
                    re[k] = uRe + vRe;
                    im[k] = uIm + vIm;
                    re[k + length / 2] = uRe - vRe;
                    im[k + length / 2] = uIm - vIm;
                    [wRe, wIm] = [wRe * wr - wIm * wi, wRe * wi + wIm * wr];
                }
            }
        }
        if (invert) {
            for (let i = 0; i < n; i++) {
                re[i] /= n;
                im[i] /= n;
            }
        }
    };
    fft(fre, fim, false);
    fft(gre, gim, false);
    for (let i = 0; i < n; i++) {
        [fre[i], fim[i]] = [fre[i] * gre[i] - fim[i] * gim[i], fre[i] * gim[i] + fim[i] * gre[i]];
    }
    fft(fre, fim, true);
    const result = new Array<number>(resultLen);
    for (let i = 0; i < resultLen; i++) {
        result[i] = Math.round(fre[i]);
    }
    return result;
}
