impl Solution {
    pub fn count_coprime(mat: Vec<Vec<i32>>) -> i32 {
        // f[d] counts selections whose picks are ALL divisible by d; rows
        // constrain picks independently, so it factors into a product of
        // per-row multiple-counts. Mobius inversion turns those f(d) into
        // the exact gcd-1 count: answer = sum(mu(d) * f(d)).
        let top = mat.iter().flatten().copied().max().unwrap() as usize;
        // mu[j] via the identity "sum of mu over the divisors of j is 1
        // exactly for j == 1": seed mu[1] and subtract down the multiples.
        let mut mu = vec![0i64; top + 1];
        mu[1] = 1;
        for i in 1..=top {
            let mut j = 2 * i;
            while j <= top {
                mu[j] -= mu[i];
                j += i;
            }
        }
        // Reduced factors keep f[d] below the modulus, so f[d] * count and
        // the final signed total stay inside i64 range; the % can land
        // negative, hence the renormalization on the way out.
        const MOD: i64 = 1_000_000_007;
        let mut f = vec![1i64; top + 1];
        let mut freq = vec![0i32; top + 1];
        for row in &mat {
            for &v in row {
                freq[v as usize] += 1;
            }
            for d in 1..=top {
                let mut count = 0i64;
                let mut multiple = d;
                while multiple <= top {
                    count += freq[multiple] as i64;
                    multiple += d;
                }
                f[d] = f[d] * count % MOD;
            }
            for &v in row {
                freq[v as usize] -= 1;
            }
        }
        let mut answer: i64 = 0;
        for d in 0..=top {
            answer += mu[d] * f[d];
        }
        ((answer % MOD + MOD) % MOD) as i32
    }
}
