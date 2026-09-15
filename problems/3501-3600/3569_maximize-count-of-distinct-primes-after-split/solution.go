import "sort"

// A prime counts on both sides of a split at k exactly when k lies in
// [first + 1, last] of its occurrence indices, so every query answer is
// (distinct primes present) + (deepest interval overlap). Each prime value
// keeps a sorted list of its occurrence indices, and an interval entering
// or leaving is two point updates in a max-prefix segment tree over the
// split positions (+1 at first+1, -1 at last+1): the root stores the
// largest prefix sum of the event array, i.e. the best overlap, and the
// update work per query is a constant number of interval insertions and
// removals.
func maximumCount(nums []int, queries [][]int) []int {
	const limit = 100001
	isPrime := make([]bool, limit)
	for i := 2; i < limit; i++ {
		isPrime[i] = true
	}
	for i := 2; i*i < limit; i++ {
		if isPrime[i] {
			for j := i * i; j < limit; j += i {
				isPrime[j] = false
			}
		}
	}
	n := len(nums)
	size := 1
	for size < n {
		size <<= 1
	}
	segSum := make([]int, 2*size)
	segBest := make([]int, 2*size)
	addEvent := func(pos, delta int) {
		u := size + pos - 1
		segSum[u] += delta
		if segSum[u] > 0 {
			segBest[u] = segSum[u]
		} else {
			segBest[u] = 0
		}
		for u >>= 1; u > 0; u >>= 1 {
			left := u + u
			segSum[u] = segSum[left] + segSum[left+1]
			cross := segSum[left] + segBest[left+1]
			if cross > segBest[left] {
				segBest[u] = cross
			} else {
				segBest[u] = segBest[left]
			}
		}
	}
	events := func(idxs []int, sign int) {
		addEvent(idxs[0]+1, sign)
		addEvent(idxs[len(idxs)-1]+1, -sign)
	}
	cur := append([]int(nil), nums...)
	occ := map[int][]int{}
	distinct := 0
	for i, v := range cur {
		if isPrime[v] {
			if _, seen := occ[v]; !seen {
				occ[v] = nil
				distinct++
			}
			occ[v] = append(occ[v], i)
		}
	}
	for _, idxs := range occ {
		if len(idxs) >= 2 {
			events(idxs, 1)
		}
	}
	answers := make([]int, 0, len(queries))
	for _, q := range queries {
		idx, val := q[0], q[1]
		old := cur[idx]
		if old != val {
			if isPrime[old] {
				if len(occ[old]) >= 2 {
					events(occ[old], -1)
				}
				at := sort.SearchInts(occ[old], idx)
				occ[old] = append(occ[old][:at], occ[old][at+1:]...)
				if len(occ[old]) == 0 {
					delete(occ, old)
					distinct--
				} else if len(occ[old]) >= 2 {
					events(occ[old], 1)
				}
			}
			if isPrime[val] {
				if lst, seen := occ[val]; seen && len(lst) >= 2 {
					events(lst, -1)
				}
				lst := occ[val]
				at := sort.SearchInts(lst, idx)
				lst = append(lst, 0)
				copy(lst[at+1:], lst[at:])
				lst[at] = idx
				occ[val] = lst
				if len(lst) >= 2 {
					events(lst, 1)
				} else {
					distinct++
				}
			}
			cur[idx] = val
		}
		answers = append(answers, distinct+segBest[1])
	}
	return answers
}
