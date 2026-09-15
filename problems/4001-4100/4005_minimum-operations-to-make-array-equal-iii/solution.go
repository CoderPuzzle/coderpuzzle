func minOperations(nums []int) int {
	n := len(nums)
	// Value -> multiplicity; already uniform (covers n = 1 and the
	// all-ones array) means nothing has to move.
	freq := make(map[int]int)
	for _, v := range nums {
		freq[v]++
	}
	if len(freq) == 1 {
		return 0
	}

	// Sieve once to sqrt(1e9); every value factors through these primes.
	const limit = 31623
	composite := make([]bool, limit+1)
	var primes []int
	for i := 2; i <= limit; i++ {
		if !composite[i] {
			primes = append(primes, i)
			for j := i * i; j <= limit; j += i {
				composite[j] = true
			}
		}
	}

	factorize := func(v int) [][2]int64 {
		var fac [][2]int64
		for _, p := range primes {
			if int64(p)*int64(p) > int64(v) {
				break
			}
			if v%p == 0 {
				e := int64(0)
				for v%p == 0 {
					v /= p
					e++
				}
				fac = append(fac, [2]int64{int64(p), e})
			}
		}
		if v > 1 {
			fac = append(fac, [2]int64{int64(v), 1})
		}
		return fac
	}
	divisors := func(fac [][2]int64) []int64 {
		ds := []int64{1}
		for _, pe := range fac {
			size := len(ds)
			power := int64(1)
			for t := int64(0); t < pe[1]; t++ {
				power *= pe[0]
				for i := 0; i < size; i++ {
					ds = append(ds, ds[i]*power)
				}
			}
		}
		return ds
	}

	type factorization struct {
		value int
		fac   [][2]int64
	}
	facs := make([]factorization, 0, len(freq))
	for v := range freq {
		facs = append(facs, factorization{v, factorize(v)})
	}

	// multipleCount[d] = number of elements divisible by d, folded by
	// frequency over every distinct value's divisor set.
	multipleCount := make(map[int64]int64)
	for _, f := range facs {
		for _, d := range divisors(f.fac) {
			multipleCount[d] += int64(freq[f.value])
		}
	}

	// A target absent from nums costs at least one operation per element
	// (>= n total), while the lcm costs at most n (every element divides
	// it in one op), so the optimum sits at a present value > 1 or at the
	// lcm itself. Track the lcm only until it outgrows any element.
	lcm := int64(1)
	capped := false
	for v := range freq {
		lcm = lcm / gcd(lcm, int64(v)) * int64(v)
		if lcm > 1000000000 {
			capped = true
			break
		}
	}
	best := int64(n)
	if !capped {
		if f, ok := freq[int(lcm)]; ok {
			best = int64(n - f)
		}
	}

	// For a target x > 1 an element equal to x pays 0, one dividing x or
	// divisible by x pays 1, anything else pays 2 (multiply by x, then
	// divide by v). Both comparable sets contain the equals, so folding
	// them in full gives cost = 2n - dd - dv with no double charge.
	for _, f := range facs {
		x := f.value
		if x == 1 {
			continue
		}
		dd := int64(0)
		for _, d := range divisors(f.fac) {
			dd += int64(freq[int(d)])
		}
		if cost := 2*int64(n) - dd - multipleCount[int64(x)]; cost < best {
			best = cost
		}
	}
	return int(best)
}

func gcd(a, b int64) int64 {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
