// Smallest-prime-factor sieve: factorizes every distinct value once so its
// divisors can be expanded cheaply, and each element's index lands in one
// bucket per divisor. Bucket g then holds, in original order, every position
// whose value is divisible by g. cnt[g] counts strictly increasing
// subsequences whose elements are all divisible by g — exactly those whose
// GCD is a multiple of g: walking bucket g in index order, an element
// contributes one plus the weight already accumulated at strictly smaller
// scaled values, which is the prefix sum a Fenwick tree keeps over value
// ranks. The descending sweep converts divisible-by counts into exactly-g
// counts: by the time g is reached, every proper multiple has been finalized
// and can be subtracted out. The subtractions can dip below zero and Go's %
// keeps the sign, so f is renormalized before it is reused or banked.
func totalBeauty(nums []int) int {
	const mod = 1_000_000_007
	maxa := 0
	for _, v := range nums {
		if v > maxa {
			maxa = v
		}
	}
	spf := make([]int, maxa+1)
	for i := range spf {
		spf[i] = i
	}
	for i := 2; i*i <= maxa; i++ {
		if spf[i] == i {
			for j := i * i; j <= maxa; j += i {
				if spf[j] == j {
					spf[j] = i
				}
			}
		}
	}
	buckets := make([][]int32, maxa+1)
	divisorCache := make(map[int][]int32)
	for index, value := range nums {
		divisors, seen := divisorCache[value]
		if !seen {
			divisors = []int32{1}
			rest := value
			for rest > 1 {
				prime := spf[rest]
				times := 0
				for rest%prime == 0 {
					rest /= prime
					times++
				}
				seed := int32(len(divisors))
				power := int64(prime)
				for t := 0; t < times; t++ {
					for k := int32(0); k < seed; k++ {
						divisors = append(divisors, int32(int64(divisors[k])*power))
					}
					power *= int64(prime)
				}
				divisorCache[value] = divisors
			}
		}
		for _, d := range divisors {
			buckets[d] = append(buckets[d], int32(index))
		}
	}
	cnt := make([]int64, maxa+1)
	for g := 1; g <= maxa; g++ {
		positions := buckets[g]
		if len(positions) == 0 {
			continue
		}
		size := maxa / g
		fen := make([]int64, size+1)
		var total int64
		for _, i := range positions {
			w := nums[i] / g
			var acc int64
			for j := w - 1; j > 0; j &= j - 1 {
				acc += fen[j]
			}
			ways := (acc + 1) % mod
			for j := w; j <= size; j += j & -j {
				fen[j] = (fen[j] + ways) % mod
			}
			total += ways
		}
		cnt[g] = total % mod
	}
	var answer int64
	exact := make([]int64, maxa+1)
	for g := maxa; g >= 1; g-- {
		f := cnt[g]
		for k := 2 * g; k <= maxa; k += g {
			f -= exact[k]
		}
		f %= mod
		if f < 0 {
			f += mod
		}
		if f != 0 {
			answer = (answer + int64(g)*f) % mod
		}
		exact[g] = f
	}
	return int(answer)
}
