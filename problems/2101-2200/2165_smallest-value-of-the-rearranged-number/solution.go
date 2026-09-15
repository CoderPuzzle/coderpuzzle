import "sort"
import "strconv"

func smallestNumber(num int64) int64 {
	// The sign only picks the sort direction: a negative result is
	// smallest when its magnitude is largest (digits descending), a
	// positive one when the smallest nonzero digit leads and the
	// zeroes follow it instead of preceding it. int64 holds every
	// rebuilt value (|num| <= 10^15) with room to spare.
	if num == 0 {
		return 0
	}
	negative := num < 0
	magnitude := num
	if negative {
		magnitude = -num
	}
	digits := []byte(strconv.FormatUint(uint64(magnitude), 10))
	ascending := func(a, b int) bool { return digits[a] < digits[b] }
	descending := func(a, b int) bool { return digits[a] > digits[b] }
	comparison := ascending
	if negative {
		comparison = descending
	}
	sort.Slice(digits, comparison)
	if !negative {
		index := 0
		for digits[index] == '0' {
			index++
		}
		digits[0], digits[index] = digits[index], digits[0]
	}
	value, err := strconv.ParseInt(string(digits), 10, 64)
	if err != nil {
		panic(err)
	}
	if negative {
		return -value
	}
	return value
}
