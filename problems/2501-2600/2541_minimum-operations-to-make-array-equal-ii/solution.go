// Each operation moves +k units onto one index and -k units off another,
// so index i needs exactly |diff_i| / k operations pushing it toward its
// target: every difference must be divisible by k, and the ups must cancel
// the downs exactly (sum of diffs == 0). Every operation accounts for 2k
// units of that movement, hence sum(|diff|) / (2k). k == 0 changes nothing
// per operation, so only arrays that are already equal work. The mass is
// <= n * 10^9 = 10^14 and answers are <= 5*10^13, both int64-safe.
func minOperations(nums1 []int, nums2 []int, k int) int64 {
	if k == 0 {
		for i := range nums1 {
			if nums1[i] != nums2[i] {
				return -1
			}
		}
		return 0
	}
	kk := int64(k)
	var net, mass int64
	for i := range nums1 {
		diff := int64(nums2[i]) - int64(nums1[i])
		magnitude := diff
		if magnitude < 0 {
			magnitude = -magnitude
		}
		if magnitude%kk != 0 {
			return -1
		}
		net += diff
		mass += magnitude
	}
	if net != 0 {
		return -1
	}
	return mass / (2 * kk)
}
