impl Solution {
    pub fn multiply(poly1: Vec<i32>, poly2: Vec<i32>) -> Vec<i64> {
        // Schoolbook multiplication is 2.5 * 10^9 products at the constraint
        // limits, so the product is computed with an iterative radix-2 FFT
        // over doubles (flat re/im vectors): pad to a power of two,
        // transform both polynomials, multiply pointwise, transform back,
        // round. Rounding is exact here -- with coefficients bounded by
        // 10^3 and lengths by 5*10^4 the largest product coefficient is
        // 5*10^10, and the double-FFT error bound (sum of squared inputs
        // < 9*10^14, here 10^11) keeps the error far below the 0.5
        // rounding threshold. Results reach 5*10^10, past 32-bit range,
        // so i64 is returned.
        let n1 = poly1.len();
        let n2 = poly2.len();
        let result_len = n1 + n2 - 1;
        let mut n = 1usize;
        while n < result_len {
            n <<= 1;
        }
        let mut fre = vec![0.0f64; n];
        let mut fim = vec![0.0f64; n];
        let mut gre = vec![0.0f64; n];
        let mut gim = vec![0.0f64; n];
        for (i, &v) in poly1.iter().enumerate() {
            fre[i] = v as f64;
        }
        for (i, &v) in poly2.iter().enumerate() {
            gre[i] = v as f64;
        }
        fft(&mut fre, &mut fim, false, n);
        fft(&mut gre, &mut gim, false, n);
        for i in 0..n {
            let re = fre[i] * gre[i] - fim[i] * gim[i];
            fim[i] = fre[i] * gim[i] + fim[i] * gre[i];
            fre[i] = re;
        }
        fft(&mut fre, &mut fim, true, n);
        let mut result = Vec::with_capacity(result_len);
        for i in 0..result_len {
            result.push(fre[i].round() as i64);
        }
        result
    }
}

fn fft(re: &mut Vec<f64>, im: &mut Vec<f64>, invert: bool, n: usize) {
    let mut j = 0usize; // incremental bit-reversal counter, persists across i
    for i in 1..n {
        let mut bit = n >> 1;
        while j & bit != 0 {
            j ^= bit;
            bit >>= 1;
        }
        j |= bit;
        if i < j {
            re.swap(i, j);
            im.swap(i, j);
        }
    }
    let mut length = 2usize;
    while length <= n {
        let pi = std::f64::consts::PI;
        let ang = (2.0 * pi / length as f64) * if invert { 1.0 } else { -1.0 };
        let (wr, wi) = (ang.cos(), ang.sin());
        let mut i = 0usize;
        while i < n {
            let (mut w_re, mut w_im) = (1.0f64, 0.0f64);
            for k in i..i + length / 2 {
                let r = k + length / 2;
                let (u_re, u_im) = (re[k], im[k]);
                let v_re = re[r] * w_re - im[r] * w_im;
                let v_im = re[r] * w_im + im[r] * w_re;
                re[k] = u_re + v_re;
                im[k] = u_im + v_im;
                re[r] = u_re - v_re;
                im[r] = u_im - v_im;
                let tw = w_re * wr - w_im * wi;
                w_im = w_re * wi + w_im * wr;
                w_re = tw;
            }
            i += length;
        }
        length <<= 1;
    }
    if invert {
        for i in 0..n {
            re[i] /= n as f64;
            im[i] /= n as f64;
        }
    }
}
