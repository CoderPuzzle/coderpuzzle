import "sort"

func minOperations(nums []int, k int, queries [][]int) []int64 {
	n := len(nums)
	// Remainder runs: a window is equalizable iff it sits inside one
	// maximal run of equal remainders, i.e. iff l and r share a mark.
	run := make([]int, n)
	for i := 1; i < n; i++ {
		add := 0
		if nums[i]%k != nums[i-1]%k {
			add = 1
		}
		run[i] = run[i-1] + add
	}
	quot := make([]int, n)
	for i, value := range nums {
		quot[i] = value / k
	}
	// Persistent segment tree over the compressed quotients: version i
	// counts the occurrences among nums[0..i-1], so the window [l, r] is
	// version r + 1 minus version l. Node 0 is the empty version.
	vals := make([]int, n)
	copy(vals, quot)
	sort.Ints(vals)
	m := 0
	for i, value := range vals {
		if i == 0 || value != vals[i-1] {
			vals[m] = value
			m++
		}
	}
	vals = vals[:m]
	nodeCap := 20*n + 10
	leftChild := make([]int, nodeCap)
	rightChild := make([]int, nodeCap)
	nodeCount := make([]int, nodeCap)
	nodeSum := make([]int64, nodeCap)
	used := 1
	var insert func(prev, lo, hi, pos, value int) int
	insert = func(prev, lo, hi, pos, value int) int {
		node := used
		used++
		leftChild[node] = leftChild[prev]
		rightChild[node] = rightChild[prev]
		nodeCount[node] = nodeCount[prev] + 1
		nodeSum[node] = nodeSum[prev] + int64(value)
		if lo < hi {
			mid := (lo + hi) >> 1
			if pos <= mid {
				leftChild[node] = insert(leftChild[prev], lo, mid, pos, value)
			} else {
				rightChild[node] = insert(rightChild[prev], mid+1, hi, pos, value)
			}
		}
		return node
	}
	roots := make([]int, n+1)
	for i, value := range quot {
		roots[i+1] = insert(roots[i], 0, m-1, sort.SearchInts(vals, value), value)
	}
	result := make([]int64, len(queries))
	for qi, query := range queries {
		l, r := query[0], query[1]
		if run[l] != run[r] {
			result[qi] = -1
			continue
		}
		a, b := roots[l], roots[r+1]
		windowSum := nodeSum[b] - nodeSum[a]
		size := r - l + 1
		need := (r - l + 2) / 2
		belowCount, belowSum := 0, int64(0)
		lo, hi := 0, m-1
		for lo < hi {
			mid := (lo + hi) >> 1
			leftCount := nodeCount[leftChild[b]] - nodeCount[leftChild[a]]
			if need <= leftCount {
				a, b = leftChild[a], leftChild[b]
				hi = mid
			} else {
				need -= leftCount
				belowCount += leftCount
				belowSum += nodeSum[leftChild[b]] - nodeSum[leftChild[a]]
				a, b = rightChild[a], rightChild[b]
				lo = mid + 1
			}
		}
		median := int64(vals[lo])
		// Below-median elements climb by their shortfall; elements at or
		// above descend by their excess; equals contribute nothing.
		result[qi] = median*int64(belowCount) - belowSum +
			(windowSum - belowSum - median*int64(size-belowCount))
	}
	return result
}
