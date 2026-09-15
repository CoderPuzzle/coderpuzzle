import "sort"

func resultArray(nums []int) []int {
	// Compress distinct values to 1-based ranks for the two Fenwick trees.
	vals := make([]int, len(nums))
	copy(vals, nums)
	sort.Ints(vals)
	comp := make(map[int]int)
	size := 0
	for i, v := range vals {
		if i == 0 || v != vals[i-1] {
			size++
			comp[v] = size
		}
	}
	tree1 := make([]int, size+1)
	tree2 := make([]int, size+1)

	add := func(tree []int, i, delta int) {
		for ; i <= size; i += i & -i {
			tree[i] += delta
		}
	}
	query := func(tree []int, i int) int {
		s := 0
		for ; i > 0; i -= i & -i {
			s += tree[i]
		}
		return s
	}

	// Seed both arrays and their trees with the first two elements.
	arr1 := []int{nums[0]}
	arr2 := []int{nums[1]}
	add(tree1, comp[nums[0]], 1)
	add(tree2, comp[nums[1]], 1)

	for _, x := range nums[2:] {
		// greaterCount = size - prefix count of ranks <= rank(x).
		c1 := len(arr1) - query(tree1, comp[x])
		c2 := len(arr2) - query(tree2, comp[x])
		if c1 > c2 {
			arr1 = append(arr1, x)
			add(tree1, comp[x], 1)
		} else if c1 < c2 {
			arr2 = append(arr2, x)
			add(tree2, comp[x], 1)
		} else {
			// Equal counts: shorter array wins; ties on length go to arr1.
			if len(arr1) <= len(arr2) {
				arr1 = append(arr1, x)
				add(tree1, comp[x], 1)
			} else {
				arr2 = append(arr2, x)
				add(tree2, comp[x], 1)
			}
		}
	}
	return append(arr1, arr2...)
}
