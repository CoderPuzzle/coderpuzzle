func countOfPairs(nums []int) int {
	// A pair is fixed once arr1 is chosen (arr2[i] = nums[i] - arr1[i]);
	// its rules collapse onto arr1: 0 <= arr1[i] <= nums[i], arr1
	// non-decreasing, and arr2 non-increasing, which together give
	// arr1[i] >= arr1[i - 1] + max(0, nums[i] - nums[i - 1]).
	//
	// pref[v] is the inclusive prefix sum of dp over values, so row i
	// reads pref[v - d] per value and is re-summed into the next pref;
	// each position costs O(max(nums)) instead of O(max(nums)^2), which
	// fits n = 2000 with values up to 1000. Every stored value is
	// reduced below 10^9 + 7 first, so a rebuilt entry stays under
	// 2 * (10^9 + 6), which fits in an int.
	const mod = 1000000007
	pref := make([]int, nums[0]+1)
	for v := range pref {
		pref[v] = v + 1 // dp[v] = 1 at i = 0
	}
	for i := 1; i < len(nums); i++ {
		d := nums[i] - nums[i-1]
		if d < 0 {
			d = 0
		}
		next := make([]int, nums[i]+1)
		acc := 0
		for v := range next {
			dp := 0
			if v >= d {
				dp = pref[v-d]
			}
			acc = (acc + dp) % mod
			next[v] = acc
		}
		pref = next
	}
	return pref[len(pref)-1]
}
