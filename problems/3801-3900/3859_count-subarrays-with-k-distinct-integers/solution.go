type countMinTree struct {
	size    int
	inf     int
	count   []int
	minimum []int
}

func newCountMinTree(n int) *countMinTree {
	size := 1
	for size < n+1 {
		size *= 2
	}
	tree := &countMinTree{size: size, inf: n + 1, count: make([]int, 2*size), minimum: make([]int, 2*size)}
	for i := range tree.minimum {
		tree.minimum[i] = tree.inf
	}
	return tree
}

func (tree *countMinTree) update(position int, active bool, mth int) {
	node := tree.size + position
	if active {
		tree.count[node] = 1
		tree.minimum[node] = mth
	} else {
		tree.count[node] = 0
		tree.minimum[node] = tree.inf
	}
	for node /= 2; node > 0; node /= 2 {
		tree.count[node] = tree.count[2*node] + tree.count[2*node+1]
		tree.minimum[node] = min3859(tree.minimum[2*node], tree.minimum[2*node+1])
	}
}

func (tree *countMinTree) kthLatest(need int) int {
	node := 1
	for node < tree.size {
		right := 2*node + 1
		if tree.count[right] >= need {
			node = right
		} else {
			need -= tree.count[right]
			node = right - 1
		}
	}
	return node - tree.size
}

func (tree *countMinTree) rangeMinimum(left int, right int) int {
	left += tree.size
	right += tree.size
	result := tree.inf
	for left <= right {
		if left&1 != 0 {
			result = min3859(result, tree.minimum[left])
			left++
		}
		if right&1 == 0 {
			result = min3859(result, tree.minimum[right])
			right--
		}
		left /= 2
		right /= 2
	}
	return result
}

func min3859(a int, b int) int {
	if a < b {
		return a
	}
	return b
}

func countSubarrays(nums []int, k int, m int) int64 {
	n := len(nums)
	tree := newCountMinTree(n)
	history := make(map[int][]int)
	answer := int64(0)

	for index, value := range nums {
		right := index + 1
		places := history[value]
		if len(places) > 0 {
			tree.update(places[len(places)-1], false, 0)
		}
		places = append(places, right)
		history[value] = places
		mth := 0
		if len(places) >= m {
			mth = places[len(places)-m]
		}
		tree.update(right, true, mth)

		if tree.count[1] < k {
			continue
		}
		lastK := tree.kthLatest(k)
		lastNext := 0
		if tree.count[1] > k {
			lastNext = tree.kthLatest(k + 1)
		}
		minMth := tree.rangeMinimum(lastK, n)
		contribution := min3859(lastK, minMth) - lastNext
		if contribution > 0 {
			answer += int64(contribution)
		}
	}
	return answer
}
