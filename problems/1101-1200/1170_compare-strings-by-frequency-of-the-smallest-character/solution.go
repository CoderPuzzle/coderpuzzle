import "sort"

func numSmallerByFrequency(queries []string, words []string) []int {
	f := func(s string) int {
		// Smallest character of the string, then how often it appears.
		smallest := byte('z' + 1)
		for i := 0; i < len(s); i++ {
			if s[i] < smallest {
				smallest = s[i]
			}
		}
		count := 0
		for i := 0; i < len(s); i++ {
			if s[i] == smallest {
				count++
			}
		}
		return count
	}
	freqs := make([]int, len(words))
	for i, w := range words {
		freqs[i] = f(w)
	}
	sort.Ints(freqs)
	answer := make([]int, len(queries))
	for i, q := range queries {
		p := f(q)
		// Everything strictly above p forms one sorted suffix; find
		// where it starts.
		lo, hi := 0, len(freqs)
		for lo < hi {
			mid := (lo + hi) / 2
			if freqs[mid] <= p {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		answer[i] = len(freqs) - lo
	}
	return answer
}
