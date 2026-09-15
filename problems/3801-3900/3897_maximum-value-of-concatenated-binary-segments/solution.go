import "sort"

func maxValue(nums1 []int, nums0 []int) int {
	order := make([]int, len(nums1))
	for i := range order {
		order[i] = i
	}
	category := func(index int) int {
		if nums0[index] == 0 {
			return 0
		}
		if nums1[index] == 0 {
			return 2
		}
		return 1
	}
	sort.Slice(order, func(i, j int) bool {
		left, right := order[i], order[j]
		leftCategory, rightCategory := category(left), category(right)
		if leftCategory != rightCategory {
			return leftCategory < rightCategory
		}
		if leftCategory != 1 {
			return false
		}
		if nums1[left] != nums1[right] {
			return nums1[left] > nums1[right]
		}
		return nums0[left] < nums0[right]
	})

	const modulus int64 = 1000000007
	var answer int64
	for _, index := range order {
		for count := 0; count < nums1[index]; count++ {
			answer = (answer*2 + 1) % modulus
		}
		for count := 0; count < nums0[index]; count++ {
			answer = answer * 2 % modulus
		}
	}
	return int(answer)
}
