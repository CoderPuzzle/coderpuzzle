import "sort"

func maxPoints(technique1 []int, technique2 []int, k int) int64 {
	// Taking technique 1 everywhere satisfies any k, so start there and
	// switch tasks to technique 2 in descending order of the gain
	// technique2[i] - technique1[i], never exceeding n - k switches.
	// A switch only helps while its gain is positive; because gains
	// arrive largest-first, every prefix is the best use of that many
	// switches, so the answer is the running maximum over those totals.
	total := int64(0)
	for _, a := range technique1 {
		total += int64(a)
	}
	best := total
	gains := make([]int64, len(technique1))
	for i, a := range technique1 {
		gains[i] = int64(technique2[i]) - int64(a)
	}
	sort.Slice(gains, func(x, y int) bool { return gains[x] > gains[y] })
	budget := len(technique1) - k
	for _, gain := range gains {
		if budget == 0 || gain <= 0 {
			break
		}
		total += gain
		budget--
		if total > best {
			best = total
		}
	}
	return best
}
