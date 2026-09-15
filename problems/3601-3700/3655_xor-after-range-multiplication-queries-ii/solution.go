import "sort"

func xorAfterQueries(nums []int, queries [][]int) int {
	const mod = int64(1000000007)
	n := len(nums)
	b := 1
	for (b+1)*(b+1) <= n {
		b++
	}
	pow := func(base int64) int64 {
		result := int64(1)
		for exp := mod - 2; exp > 0; exp >>= 1 {
			if exp&1 == 1 {
				result = result * base % mod
			}
			base = base * base % mod
		}
		return result
	}
	type event struct {
		pos  int
		mult int64
	}
	// Strides above the threshold visit fewer than sqrt(n) + 1 positions
	// each and are applied literally; strides at or below it share
	// residue-class buckets, each applied in one prefix-product sweep.
	buckets := map[int][]event{}
	for _, query := range queries {
		l, r, k, v := query[0], query[1], query[2], query[3]
		if k > b {
			for idx := l; idx <= r; idx += k {
				nums[idx] = int(int64(nums[idx]) * int64(v) % mod)
			}
		} else {
			c := l % k
			key := k*(b+1) + c
			// Coordinate events: the multiplier starts at l's coordinate
			// and stops just past the last visited coordinate.
			buckets[key] = append(buckets[key],
				event{l / k, int64(v)},
				event{(r-c)/k + 1, pow(int64(v))})
		}
	}
	for key, events := range buckets {
		k, c := key/(b+1), key%(b+1)
		sort.Slice(events, func(i, j int) bool { return events[i].pos < events[j].pos })
		span := (n-1-c)/k + 1
		acc := int64(1)
		prev := 0
		i := 0
		for i < len(events) {
			pos := events[i].pos
			if acc != 1 {
				for p := prev; p < pos; p++ {
					nums[c+p*k] = int(int64(nums[c+p*k]) * acc % mod)
				}
			}
			d := int64(1)
			for i < len(events) && events[i].pos == pos {
				d = d * events[i].mult % mod
				i++
			}
			acc = acc * d % mod
			prev = pos
		}
		if acc != 1 {
			for p := prev; p < span; p++ {
				nums[c+p*k] = int(int64(nums[c+p*k]) * acc % mod)
			}
		}
	}
	x := 0
	for _, value := range nums {
		x ^= value
	}
	return x
}
