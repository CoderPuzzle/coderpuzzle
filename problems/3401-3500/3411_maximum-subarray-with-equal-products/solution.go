// Elements are at most 10, so any lcm divides 2520 and any gcd is at most
// 10: once the running product passes 25200 it can never equal lcm * gcd
// again, so the inner walk can stop early.
func maxLength(nums []int) int {
	n := len(nums)
	ans := 0
	for left := 0; left < n; left++ {
		prod, g, m := 1, 0, 1
		for right := left; right < n; right++ {
			x := nums[right]
			prod *= x
			g = gcd3411(g, x)
			m = m * x / gcd3411(m, x)
			if prod == m*g {
				if right-left+1 > ans {
					ans = right - left + 1
				}
			} else if prod > 25200 {
				break
			}
		}
	}
	return ans
}

func gcd3411(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
