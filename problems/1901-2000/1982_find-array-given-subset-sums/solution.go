import "sort"

func recoverArray(n int, sums []int) []int {
	cur := make([]int, len(sums))
	copy(cur, sums)
	sort.Ints(cur)
	res := make([]int, 0, n)
	for len(cur) > 1 {
		diff := cur[len(cur)-1] - cur[len(cur)-2]
		cnt := make(map[int]int, len(cur))
		for _, x := range cur {
			cnt[x]++
		}
		left := make([]int, 0, len(cur)/2)  // sums without the element
		right := make([]int, 0, len(cur)/2) // sums with the element
		for _, x := range cur {
			if cnt[x] > 0 {
				cnt[x]--
				left = append(left, x)
				cnt[x+diff]--
				right = append(right, x+diff)
			}
		}
		zeroInLeft := false
		for _, x := range left {
			if x == 0 {
				zeroInLeft = true
				break
			}
		}
		if zeroInLeft {
			res = append(res, diff)
			cur = left
		} else {
			res = append(res, -diff)
			cur = right
		}
	}
	return res
}
