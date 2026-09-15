impl Solution {
    pub fn abbreviate_product(left: i32, right: i32) -> String {
        const MODULUS: i64 = 10_000_000_000;
        let mut logarithm = 0.0f64;
        let mut twos = 0;
        let mut fives = 0;
        let mut suffix = 1i64;

        for value in left..=right {
            logarithm += (value as f64).log10();
            let mut remaining = value;
            while remaining % 2 == 0 {
                twos += 1;
                remaining /= 2;
            }
            while remaining % 5 == 0 {
                fives += 1;
                remaining /= 5;
            }
            suffix = suffix * remaining as i64 % MODULUS;
        }

        let zeros = twos.min(fives);
        for _ in zeros..twos {
            suffix = suffix * 2 % MODULUS;
        }
        for _ in zeros..fives {
            suffix = suffix * 5 % MODULUS;
        }

        let adjusted_logarithm = logarithm - zeros as f64;
        let digits = adjusted_logarithm.floor() as i32 + 1;
        if digits <= 10 {
            return format!("{}e{}", suffix, zeros);
        }
        let fractional = adjusted_logarithm - adjusted_logarithm.floor();
        let prefix = 10f64.powf(fractional + 4.0).floor() as i32;
        format!("{}...{:05}e{}", prefix, suffix % 100_000, zeros)
    }
}
