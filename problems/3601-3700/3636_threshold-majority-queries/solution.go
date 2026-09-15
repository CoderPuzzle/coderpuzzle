import "sort"

func isqrt(q int) int {
	s := 0
	for (s+1)*(s+1) <= q {
		s++
	}
	return s
}

func lowerBound(list []int, target int) int {
	return sort.Search(len(list), func(i int) bool { return list[i] >= target })
}

func upperBound(list []int, target int) int {
	return sort.Search(len(list), func(i int) bool { return list[i] > target })
}

func subarrayMajority(nums []int, queries [][]int) []int {
	n := len(nums)
	// Rank-compress: "smallest value" becomes "smallest rank".
	values := append([]int(nil), nums...)
	sort.Ints(values)
	width := 0
	for i, v := range values {
		if i == 0 || v != values[i-1] {
			width++
			values[width-1] = v
		}
	}
	values = values[:width]
	a := make([]int, n)
	for i, v := range nums {
		a[i] = sort.SearchInts(values, v)
	}
	// occ[x] lists the sorted positions of rank x, so any range frequency is
	// two binary searches.
	m := len(values)
	occ := make([][]int, m)
	for pos, x := range a {
		occ[x] = append(occ[x], pos)
	}

	// Block size balancing the block-pair sweep against query fringes.
	b := n / isqrt(len(queries))
	if b < 1 {
		b = 1
	}
	k := (n + b - 1) / b
	// topF[i*k+j] / topV[i*k+j]: highest frequency inside blocks i..j and the
	// smallest rank attaining it. One sweep per left block grows the window
	// additions-only, so counts never decrease and the mode pair stays O(1)
	// per element.
	topF := make([]int, k*k)
	topV := make([]int, k*k)
	cnt := make([]int, m)
	for i := 0; i < k; i++ {
		for x := range cnt {
			cnt[x] = 0
		}
		mf, mv, pos := 0, 0, i*b
		for j := i; j < k; j++ {
			end := (j + 1) * b
			if end > n {
				end = n
			}
			for ; pos < end; pos++ {
				x := a[pos]
				cnt[x]++
				c := cnt[x]
				if c > mf {
					mf, mv = c, x
				} else if c == mf && x < mv {
					mv = x
				}
			}
			topF[i*k+j] = mf
			topV[i*k+j] = mv
		}
	}

	// The overall top element clears any threshold exactly when something
	// does, so every answer is that element's pair checked once.
	stamp := make([]int, m)
	freq := make([]int, m)
	token := 0
	out := make([]int, 0, len(queries))
	for _, query := range queries {
		l, r, t := query[0], query[1], query[2]
		bl, br := l/b, r/b
		token++
		var bf, bv int
		if br-bl <= 1 {
			// Range spans at most two blocks: count it directly.
			bf, bv = 0, 0
			for pos := l; pos <= r; pos++ {
				x := a[pos]
				if stamp[x] != token {
					stamp[x] = token
					freq[x] = 1
				} else {
					freq[x]++
				}
				c := freq[x]
				if c > bf {
					bf, bv = c, x
				} else if c == bf && x < bv {
					bv = x
				}
			}
		} else {
			// Whole blocks give the base candidate; every distinct fringe rank
			// gets its exact range frequency from two binary searches (its
			// total count also spans the middle blocks, so fringe counts alone
			// can never prune it).
			idx := (bl+1)*k + br - 1
			bf, bv = topF[idx], topV[idx]
			var seen []int
			for pos := l; pos < (bl+1)*b; pos++ {
				x := a[pos]
				if stamp[x] != token {
					stamp[x] = token
					seen = append(seen, x)
				}
			}
			for pos := br * b; pos <= r; pos++ {
				x := a[pos]
				if stamp[x] != token {
					stamp[x] = token
					seen = append(seen, x)
				}
			}
			for _, x := range seen {
				f := upperBound(occ[x], r) - lowerBound(occ[x], l)
				if f > bf || (f == bf && x < bv) {
					bf, bv = f, x
				}
			}
		}
		if bf >= t {
			out = append(out, values[bv])
		} else {
			out = append(out, -1)
		}
	}
	return out
}
