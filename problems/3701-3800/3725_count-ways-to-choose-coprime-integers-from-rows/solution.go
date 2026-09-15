func countCoprime(mat [][]int) int {
	// f[d] counts selections whose picks are ALL divisible by d; rows
	// constrain picks independently, so it factors into a product of
	// per-row multiple-counts. Mobius inversion turns those f(d) into
	// the exact gcd-1 count: answer = sum(mu(d) * f(d)).
	top := 0
	for _, row := range mat {
		for _, v := range row {
			if v > top {
				top = v
			}
		}
	}
	// mu[j] via the identity "sum of mu over the divisors of j is 1
	// exactly for j == 1": seed mu[1] and subtract down the multiples.
	mu := make([]int, top+1)
	mu[1] = 1
	for i := 1; i <= top; i++ {
		for j := 2 * i; j <= top; j += i {
			mu[j] -= mu[i]
		}
	}
	// Reduced factors keep f[d] below the modulus, so f[d] * count and
	// the final signed total stay inside int64 range; the % can land
	// negative, hence the renormalization on the way out.
	const mod = 1_000_000_007
	f := make([]int64, top+1)
	for d := range f {
		f[d] = 1
	}
	freq := make([]int, top+1)
	for _, row := range mat {
		for _, v := range row {
			freq[v]++
		}
		for d := 1; d <= top; d++ {
			count := 0
			for multiple := d; multiple <= top; multiple += d {
				count += freq[multiple]
			}
			f[d] = f[d] * int64(count) % mod
		}
		for _, v := range row {
			freq[v]--
		}
	}
	var answer int64
	for d := range f {
		answer += int64(mu[d]) * f[d]
	}
	return int((answer%mod + mod) % mod)
}
