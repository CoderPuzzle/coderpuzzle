import "sort"

func maximizeGreatness(nums []int) int {
	// Sort the array; then scan a second sorted copy of the same multiset
	// with a fast pointer that always offers the smallest not yet
	// committed value strictly greater than the current element. Spending
	// the cheapest sufficient value on each position in increasing order
	// is an exchange-argument optimum, so the number of commitments is
	// the greatness.
	arr := append([]int(nil), nums...)
	supply := append([]int(nil), nums...)
	sort.Ints(arr)
	sort.Ints(supply)
	count, j := 0, 0
	for _, x := range arr {
		for j < len(supply) && supply[j] <= x {
			j++
		}
		if j == len(supply) {
			break
		}
		count++
		j++
	}
	return count
}
