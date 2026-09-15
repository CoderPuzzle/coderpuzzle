func resultArray(nums []int, k int, queries [][]int) []int {
	// After the update and the forced prefix removal, the operation picks
	// nums[start..j], so a query counts j >= start whose product from start
	// is x mod k. Each segment tree node stores the counts of its segment's
	// prefix products plus the segment product; merging prepends the left
	// product to the right child's counts, and the suffix query merges the
	// decomposition of nums[start..] left to right while carrying the
	// running product. Every stored value is below k <= 5 and every count
	// below n, so ints suffice.
	n := len(nums)
	size := 1
	for size < n {
		size <<= 1
	}
	cnt := make([]int, 2*size*k)
	prod := make([]int, 2*size)
	for i := range prod {
		prod[i] = 1
	}
	for i, v := range nums {
		prod[size+i] = v % k
		cnt[(size+i)*k+v%k] = 1
	}
	for u := size - 1; u >= 1; u-- {
		merge(cnt, prod, u, k)
	}
	result := make([]int, 0, len(queries))
	for _, query := range queries {
		index, value, start, x := query[0], query[1], query[2], query[3]
		leaf := size + index
		row := leaf * k
		for r := 0; r < k; r++ {
			cnt[row+r] = 0
		}
		cnt[row+value%k] = 1
		prod[leaf] = value % k
		for u := leaf >> 1; u >= 1; u >>= 1 {
			merge(cnt, prod, u, k)
		}
		lo, hi := size+start, 2*size
		cur := make([]int, k)
		running := 1
		for lo < hi {
			if lo&1 == 1 {
				base := lo * k
				for p := 0; p < k; p++ {
					if c := cnt[base+p]; c != 0 {
						cur[running*p%k] += c
					}
				}
				running = running * prod[lo] % k
				lo++
			}
			lo >>= 1
			hi >>= 1
		}
		result = append(result, cur[x])
	}
	return result
}

func merge(cnt []int, prod []int, u int, k int) {
	base := u * k
	lrow := 2 * u * k
	rrow := lrow + k
	copy(cnt[base:base+k], cnt[lrow:lrow+k])
	lp := prod[u+u]
	for p := 0; p < k; p++ {
		if c := cnt[rrow+p]; c != 0 {
			cnt[base+lp*p%k] += c
		}
	}
	prod[u] = lp * prod[u+u+1] % k
}
