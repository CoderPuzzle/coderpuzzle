import "sort"

// Each element may land anywhere in [v-k, v+k]; assigning the values in
// sorted order leaves every element the smallest value that is still free
// and inside its window, which never hurts later ones.
func maxDistinctElements(nums []int, k int) int {
	a := append([]int(nil), nums...)
	sort.Ints(a)
	last := a[0] - k - 1
	count := 0
	for _, v := range a {
		target := v - k
		if target <= last {
			target = last + 1
		}
		if target <= v+k {
			last = target
			count++
		}
	}
	return count
}
