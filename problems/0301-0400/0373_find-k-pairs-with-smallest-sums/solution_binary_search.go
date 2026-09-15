import "sort"

func kSmallestPairs(nums1 []int, nums2 []int, k int) [][]int {
	m := len(nums1)
	n := len(nums2)
	// How many pairs sum to at most s? Both arrays are sorted, so a
	// descending pointer into nums2 serves every nums1[i]: the bound
	// s - nums1[i] only falls as i rises, so the pointer never turns back.
	countAtMost := func(s int64) int64 {
		var total int64
		j := n - 1
		for _, a := range nums1 {
			bound := s - int64(a)
			for j >= 0 && int64(nums2[j]) > bound {
				j--
			}
			total += int64(j + 1)
		}
		return total
	}
	// The k-th smallest sum is the least s with countAtMost(s) >= k.
	lo := int64(nums1[0]) + int64(nums2[0])
	hi := int64(nums1[m-1]) + int64(nums2[n-1])
	for lo < hi {
		mid := lo + (hi-lo)/2
		if countAtMost(mid) >= int64(k) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	threshold := lo
	// Every pair strictly below the threshold makes the cut — there are
	// fewer than k of them by the minimality of the threshold.
	type entry struct {
		sum  int64
		i, j int
	}
	below := []entry{}
	j := n - 1
	for i, a := range nums1 {
		for j >= 0 && int64(a)+int64(nums2[j]) >= threshold {
			j--
		}
		for jj := 0; jj <= j; jj++ {
			below = append(below, entry{int64(a) + int64(nums2[jj]), i, jj})
		}
	}
	sort.Slice(below, func(x, y int) bool {
		if below[x].sum != below[y].sum {
			return below[x].sum < below[y].sum
		}
		if below[x].i != below[y].i {
			return below[x].i < below[y].i
		}
		return below[x].j < below[y].j
	})
	result := make([][]int, 0, k)
	for _, e := range below {
		result = append(result, []int{nums1[e.i], nums2[e.j]})
	}
	// Top up with pairs exactly at the threshold, in (i, j) order — the
	// required tie-break among equal sums.
	needed := k - len(result)
	for _, a := range nums1 {
		if needed == 0 {
			break
		}
		target := threshold - int64(a)
		loJ := sort.Search(n, func(j int) bool { return int64(nums2[j]) >= target })
		hiJ := sort.Search(n, func(j int) bool { return int64(nums2[j]) > target })
		for jj := loJ; jj < hiJ && needed > 0; jj++ {
			result = append(result, []int{a, nums2[jj]})
			needed--
		}
	}
	return result
}
