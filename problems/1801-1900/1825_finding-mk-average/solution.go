// Two Fenwick trees indexed by value — one of counts, one of sums — hold
// the current m-wide window, alongside the window itself in arrival
// order. addElement inserts the new value and, once the window is full,
// removes the value that just slid out; both are O(log V). A query
// descends the count tree twice to read off the combined value of the j
// smallest elements for j = k and j = m - k, so the trimmed middle sum
// is S(m-k) - S(k) and the answer is that sum floor-divided by m - 2k,
// or -1 while the stream is still shorter than m.
package main

const limit = 100000

type MKAverage struct {
	m      int
	k      int
	counts []int
	sums   []int64
	window []int
	head   int
	size   int
}

func NewMKAverageTyped(m int, k int) *MKAverage {
	return &MKAverage{
		m:      m,
		k:      k,
		counts: make([]int, limit+1),
		sums:   make([]int64, limit+1),
		window: make([]int, 0, m),
	}
}

func (design *MKAverage) updateTree(value, delta int) {
	// Counts and sums move together so a descent can pair them; the sum
	// side always charges the element's own value, not the bucket index.
	for element := value; value <= limit; value += value & -value {
		design.counts[value] += delta
		design.sums[value] += int64(element) * int64(delta)
	}
}

func (design *MKAverage) addElement(num int) {
	design.window = append(design.window, num)
	design.updateTree(num, 1)
	design.size++
	if design.size > design.m {
		// The window holds exactly the last m elements: evict the oldest.
		old := design.window[design.head]
		design.head++
		design.updateTree(old, -1)
		design.size--
	}
}

func (design *MKAverage) smallestSum(j int) int64 {
	// Descend the count tree to the value holding the j-th smallest
	// element, accumulating the sums of fully covered buckets.
	index, taken := 0, 0
	var total int64
	for step := 1 << 16; step > 0; step >>= 1 {
		next := index + step
		if next <= limit && taken+design.counts[next] < j {
			index = next
			taken += design.counts[next]
			total += design.sums[next]
		}
	}
	return total + int64(index+1)*int64(j-taken)
}

func (design *MKAverage) calculateMKAverage() int {
	if design.size < design.m {
		return -1
	}
	middle := design.smallestSum(design.m-design.k) - design.smallestSum(design.k)
	return int(middle / int64(design.m-2*design.k))
}
