import (
	"sort"
)

func makeSimilar(nums []int, target []int) int64 {
	// Every move is +-2, so an element's parity never changes and the
	// even/odd classes evolve independently in size. Within a class,
	// matching sorted positions smallest-to-smallest (hints 2-3) never
	// wastes work: any crossing assignment can be uncrossed without
	// raising the total rise. Each operation supplies exactly one +2,
	// so the answer is the total positive rise divided by 2 — the
	// drops are free riders on the same operations.
	evens := paritySorted(nums, 0)
	odds := paritySorted(nums, 1)
	tevens := paritySorted(target, 0)
	todds := paritySorted(target, 1)
	var ops int64 = 0
	for i := range evens {
		if tevens[i] > evens[i] {
			ops += int64(tevens[i]-evens[i]) / 2
		}
	}
	for i := range odds {
		if todds[i] > odds[i] {
			ops += int64(todds[i]-odds[i]) / 2
		}
	}
	return ops
}

func paritySorted(arr []int, parity int) []int {
	out := []int{}
	for _, x := range arr {
		if x%2 == parity {
			out = append(out, x)
		}
	}
	sort.Slice(out, func(i, j int) bool { return out[i] < out[j] })
	return out
}
