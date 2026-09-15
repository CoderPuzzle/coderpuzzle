import "sort"

type alternatingMaxTree struct {
	size int
	tree []int64
}

func newAlternatingMaxTree(length int) alternatingMaxTree {
	size := 1
	for size < length {
		size *= 2
	}
	return alternatingMaxTree{size: size, tree: make([]int64, 2*size)}
}

func (segment *alternatingMaxTree) update(index int, value int64) {
	index += segment.size
	if value > segment.tree[index] {
		segment.tree[index] = value
	}
	for index /= 2; index > 0; index /= 2 {
		segment.tree[index] = segment.tree[2*index]
		if segment.tree[2*index+1] > segment.tree[index] {
			segment.tree[index] = segment.tree[2*index+1]
		}
	}
}

func (segment *alternatingMaxTree) query(left, right int) int64 {
	left += segment.size
	right += segment.size
	var best int64
	for left < right {
		if left&1 == 1 {
			if segment.tree[left] > best {
				best = segment.tree[left]
			}
			left++
		}
		if right&1 == 1 {
			right--
			if segment.tree[right] > best {
				best = segment.tree[right]
			}
		}
		left /= 2
		right /= 2
	}
	return best
}

func maxAlternatingSum(nums []int, k int) int64 {
	values := append([]int(nil), nums...)
	sort.Ints(values)
	unique := values[:0]
	for _, value := range values {
		if len(unique) == 0 || unique[len(unique)-1] != value {
			unique = append(unique, value)
		}
	}
	upTree := newAlternatingMaxTree(len(unique))
	downTree := newAlternatingMaxTree(len(unique))
	up := make([]int64, len(nums))
	down := make([]int64, len(nums))
	var answer int64

	for i, value := range nums {
		if i >= k {
			eligible := i - k
			rank := sort.SearchInts(unique, nums[eligible])
			upTree.update(rank, up[eligible])
			downTree.update(rank, down[eligible])
		}
		rank := sort.SearchInts(unique, value)
		up[i] = int64(value) + downTree.query(0, rank)
		down[i] = int64(value) + upTree.query(rank+1, len(unique))
		if up[i] > answer {
			answer = up[i]
		}
		if down[i] > answer {
			answer = down[i]
		}
	}
	return answer
}
