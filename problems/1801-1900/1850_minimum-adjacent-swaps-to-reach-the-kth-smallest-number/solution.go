// Apply next-permutation k times to get the target digits, then the minimum
// adjacent swaps to rearrange num into it is the inversion count of the
// order-preserving digit matching.
func getMinSwaps(num string, k int) int {
	n := len(num)
	arr := make([]int, n)
	for i := 0; i < n; i++ {
		arr[i] = int(num[i] - '0')
	}
	for t := 0; t < k; t++ {
		nextPermutation(arr)
	}
	var slots [10][]int
	for i := 0; i < n; i++ {
		d := int(num[i] - '0')
		slots[d] = append(slots[d], i)
	}
	perm := make([]int, n)
	for i := 0; i < n; i++ {
		perm[i] = slots[arr[i]][0]
		slots[arr[i]] = slots[arr[i]][1:]
	}
	tree := make([]int64, n+1)
	var inv int64
	for i := 0; i < n; i++ {
		var lessEq int64
		for x := perm[i]; x > 0; x -= x & (-x) {
			lessEq += tree[x]
		}
		inv += int64(i) - lessEq
		for x := perm[i] + 1; x <= n; x += x & (-x) {
			tree[x]++
		}
	}
	return int(inv)
}

func nextPermutation(a []int) {
	n := len(a)
	i := n - 2
	for i >= 0 && a[i] >= a[i+1] {
		i--
	}
	j := n - 1
	for a[j] <= a[i] {
		j--
	}
	a[i], a[j] = a[j], a[i]
	for l, r := i+1, n-1; l < r; l, r = l+1, r-1 {
		a[l], a[r] = a[r], a[l]
	}
}
