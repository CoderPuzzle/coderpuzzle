import "sort"

func maximumStrongPairXor(nums []int) int {
	// Sorted sweep with a sliding window [ceil(y/2), y]: a binary trie
	// over the 20 value bits, each node carrying a count of live window
	// values, answers "best XOR partner of y in the window" greedily.
	// The left pointer retires values whose doubling falls below y.
	sort.Ints(nums)
	const BITS = 20 // nums[i] <= 2^20 - 1
	child := make([][2]int32, 1)
	cnt := make([]int32, 1)
	best := 0
	left := 0
	for _, y := range nums {
		// insert y
		node := int32(0)
		for b := BITS - 1; b >= 0; b-- {
			d := int32((y >> b) & 1)
			nxt := child[node][d]
			if nxt == 0 {
				child = append(child, [2]int32{})
				cnt = append(cnt, 0)
				nxt = int32(len(child) - 1)
				child[node][d] = nxt
			}
			node = nxt
			cnt[node]++
		}
		// retire x from the left while 2 * x < y
		for 2*nums[left] < y {
			x := nums[left]
			node2 := int32(0)
			for b := BITS - 1; b >= 0; b-- {
				node2 = child[node2][(x>>b)&1]
				cnt[node2]--
			}
			left++
		}
		// query: prefer the opposite bit while that subtree is live
		node3 := int32(0)
		res := 0
		for b := BITS - 1; b >= 0; b-- {
			d := int32((y >> b) & 1)
			want := child[node3][d^1]
			if want != 0 && cnt[want] > 0 {
				res |= 1 << b
				node3 = want
			} else {
				node3 = child[node3][d]
			}
		}
		best = max(best, res)
	}
	return best
}
