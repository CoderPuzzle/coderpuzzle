func maximumSumSubsequence(nums []int, queries [][]int) int {
	const MOD = 1000000007
	// sentinel for impossible boundary states; clamped on every merge so
	// sentinel sums cannot cascade into overflow (all valid values have
	// magnitude <= ~5e12, far above HALF)
	const NEG = -(1 << 60)
	const HALF = NEG / 2

	n := len(nums)
	// tree[node] = [m00, m01, m10, m11]: [i][j] with i = leftmost taken?,
	// j = rightmost taken?
	tree := make([][4]int64, 4*n)

	var leaf func(x int64) [4]int64
	leaf = func(x int64) [4]int64 {
		return [4]int64{0, NEG, NEG, x}
	}

	addClamped := func(a, b int64) int64 {
		if a < HALF || b < HALF {
			return NEG
		}
		return a + b
	}

	var mergeNodes func(left, right [4]int64) [4]int64
	mergeNodes = func(left, right [4]int64) [4]int64 {
		var out [4]int64
		for i := 0; i < 2; i++ {
			for j := 0; j < 2; j++ {
				b := int64(NEG)
				for k := 0; k < 2; k++ {
					for l := 0; l < 2; l++ {
						if k == 1 && l == 1 {
							continue
						}
						val := addClamped(left[i*2+k], right[l*2+j])
						if val > b {
							b = val
						}
					}
				}
				out[i*2+j] = b
			}
		}
		return out
	}

	var build func(node, lo, hi int)
	build = func(node, lo, hi int) {
		if hi-lo == 1 {
			tree[node] = leaf(int64(nums[lo]))
			return
		}
		mid := (lo + hi) / 2
		build(node*2, lo, mid)
		build(node*2+1, mid, hi)
		tree[node] = mergeNodes(tree[node*2], tree[node*2+1])
	}

	var update func(node, lo, hi, pos, val int)
	update = func(node, lo, hi, pos, val int) {
		if hi-lo == 1 {
			tree[node] = leaf(int64(val))
			return
		}
		mid := (lo + hi) / 2
		if pos < mid {
			update(node*2, lo, mid, pos, val)
		} else {
			update(node*2+1, mid, hi, pos, val)
		}
		tree[node] = mergeNodes(tree[node*2], tree[node*2+1])
	}

	build(1, 0, n)
	answer := 0
	for _, q := range queries {
		update(1, 0, n, q[0], q[1])
		best := tree[1][0]
		for e := 1; e < 4; e++ {
			if tree[1][e] > best {
				best = tree[1][e]
			}
		}
		answer = (answer + int(best)) % MOD
	}
	return answer
}
