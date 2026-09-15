import "sort"

func powerUpdate(nums []int, p int, queries [][]int) []int {
	values := append([]int{}, nums...)
	for _, query := range queries {
		values = append(values, query[0])
	}
	sort.Ints(values)
	unique := values[:0]
	for _, value := range values {
		if len(unique) == 0 || unique[len(unique)-1] != value {
			unique = append(unique, value)
		}
	}
	values = unique
	tree := make([]int, len(values)+1)
	add := func(index int) {
		for index++; index < len(tree); index += index & -index {
			tree[index]++
		}
	}
	for _, value := range nums {
		add(sort.SearchInts(values, value))
	}
	size := len(nums)
	answer := make([]int, 0, len(queries))
	for _, query := range queries {
		add(sort.SearchInts(values, query[0]))
		size++
		rank := size - query[1] + 1
		index := 0
		step := 1
		for step<<1 <= len(values) {
			step <<= 1
		}
		for ; step > 0; step >>= 1 {
			next := index + step
			if next < len(tree) && tree[next] < rank {
				index = next
				rank -= tree[next]
			}
		}
		p = modPower3930(p, values[index])
		answer = append(answer, p)
	}
	return answer
}

func modPower3930(base int, exponent int) int {
	const modulus int64 = 1000000007
	result := int64(1)
	value := int64(base)
	for exponent > 0 {
		if exponent&1 != 0 {
			result = result * value % modulus
		}
		value = value * value % modulus
		exponent >>= 1
	}
	return int(result)
}
