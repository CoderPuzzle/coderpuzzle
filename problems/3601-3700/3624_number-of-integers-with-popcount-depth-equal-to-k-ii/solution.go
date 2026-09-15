import "math/bits"

// Every popcount chain collapses to 1 in at most four steps for values
// <= 10^15, so depths live in 0..4 (k may still ask for 5, whose tree
// simply stays empty). Six Fenwick trees, one per depth class, each
// marking the indices currently holding that depth: a query is a
// prefix-difference on tree[k], an update is two point flips. All loops
// are iterative, and every count is <= n, so 32-bit answers are safe
// while values ride in 64-bit.
func popcountDepth(nums []int64, queries [][]int64) []int {
	n := len(nums)
	trees := make([][]int, 6)
	for k := range trees {
		trees[k] = make([]int, n+1)
	}
	depth := func(x int64) int {
		d := 0
		for x > 1 {
			x = int64(bits.OnesCount64(uint64(x)))
			d++
		}
		return d
	}
	add := func(k, i, delta int) {
		for i++; i <= n; i += i & -i {
			trees[k][i] += delta
		}
	}
	pref := func(k, i int) int {
		s := 0
		for ; i > 0; i -= i & -i {
			s += trees[k][i]
		}
		return s
	}
	for i, v := range nums {
		add(depth(v), i, 1)
	}
	answer := make([]int, 0, len(queries))
	for _, q := range queries {
		if q[0] == 1 {
			k := int(q[3])
			answer = append(answer, pref(k, int(q[2])+1)-pref(k, int(q[1])))
		} else {
			idx := int(q[1])
			add(depth(nums[idx]), idx, -1)
			nums[idx] = q[2]
			add(depth(nums[idx]), idx, 1)
		}
	}
	return answer
}
