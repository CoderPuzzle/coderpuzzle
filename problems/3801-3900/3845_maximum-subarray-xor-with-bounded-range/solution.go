// Bounds: nums[i] < 2^15 and XOR never widens a value, so every prefix
// xor, subarray value, and the answer stay below 2^15: 15 trie levels
// (bit 14 down to bit 0) cover the universe.
func maxXor(nums []int, k int) int {
	n := len(nums)
	pref := make([]int, n+1)
	for i, v := range nums {
		pref[i+1] = pref[i] ^ v
	}
	size := 15*n + 1
	child := make([]int, 2*size) // children of node j: child[2j], child[2j+1]
	for j := range child {
		child[j] = -1
	}
	cnt := make([]int, size)
	nodes := 1             // next free node id; node 0 is the root
	maxQ := make([]int, n) // indices of max candidates, values decreasing
	minQ := make([]int, n) // indices of min candidates, values increasing
	maxHead, maxTail := 0, 0
	minHead, minTail := 0, 0
	left := 0
	best := 0
	for right, x := range nums {
		for maxHead < maxTail && nums[maxQ[maxTail-1]] <= x {
			maxTail--
		}
		maxQ[maxTail] = right
		maxTail++
		for minHead < minTail && nums[minQ[minTail-1]] >= x {
			minTail--
		}
		minQ[minTail] = right
		minTail++
		// Valid starts are exactly [left, right]: shrink from the left
		// while the window spread exceeds k, retiring pref[left] from
		// the trie as each start index leaves. A single element has
		// spread 0 <= k, so the loop always stops.
		for nums[maxQ[maxHead]]-nums[minQ[minHead]] > k {
			if maxQ[maxHead] == left {
				maxHead++
			}
			if minQ[minHead] == left {
				minHead++
			}
			v := pref[left]
			node := 0
			cnt[0]--
			for b := 14; b >= 0; b-- {
				node = child[2*node+((v>>b)&1)]
				cnt[node]--
			}
			left++
		}
		// Insert pref[right]: start index right becomes eligible.
		v := pref[right]
		node := 0
		cnt[0]++
		for b := 14; b >= 0; b-- {
			slot := 2*node + ((v >> b) & 1)
			nxt := child[slot]
			if nxt < 0 {
				nxt = nodes
				nodes++
				child[slot] = nxt
			}
			node = nxt
			cnt[node]++
		}
		// Best subarray ending at right: max pref[right+1] ^ pref[l]
		// over l in [left, right]. Greedy walk, preferring the child
		// whose bit differs from pref[right+1] (setting the result bit)
		// while that branch is alive (nonempty count).
		q := pref[right+1]
		node = 0
		cur := 0
		for b := 14; b >= 0; b-- {
			d := (q >> b) & 1
			nxt := child[2*node+(d^1)]
			if nxt >= 0 && cnt[nxt] > 0 {
				cur |= 1 << b
				node = nxt
			} else {
				node = child[2*node+d]
			}
		}
		if cur > best {
			best = cur
		}
	}
	return best
}
