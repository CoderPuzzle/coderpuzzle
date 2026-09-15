import "sort"

func maxPoints(technique1 []int, technique2 []int, k int) int64 {
	// Start from the best-of-both baseline: each task pays its larger
	// value. Tasks where technique 1 already wins count toward the quota
	// for free; every task where technique 2 wins must pay back its win
	// (technique2[i] - technique1[i]) whenever the free count falls short
	// of k, and paying back the smallest losses first is plainly optimal.
	// No sort of the whole array is needed.
	base := int64(0)
	losses := make([]int64, 0, len(technique1))
	free := 0
	for i, a := range technique1 {
		if b := technique2[i]; a >= b {
			base += int64(a)
			free++
		} else {
			base += int64(b)
			losses = append(losses, int64(b)-int64(a))
		}
	}
	if forced := k - free; forced > 0 {
		sort.Slice(losses, func(x, y int) bool { return losses[x] < losses[y] })
		for _, loss := range losses[:forced] {
			base -= loss
		}
	}
	return base
}
