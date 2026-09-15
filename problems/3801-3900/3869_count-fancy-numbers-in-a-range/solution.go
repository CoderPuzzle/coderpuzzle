import (
	"sort"
	"strconv"
)

func countFancy(l int64, r int64) int64 {
	// Strictly increasing numbers draw digits from 1..9; strictly decreasing
	// ones from 0..9 with no leading zero. Enumerate every nonempty digit
	// subset once per direction and deduplicate.
	set := make(map[int64]bool)
	for mask := 1; mask < (1 << 9); mask++ {
		var num int64
		for d := 1; d <= 9; d++ {
			if mask&(1<<(d-1)) != 0 {
				num = num*10 + int64(d)
			}
		}
		set[num] = true
	}
	for mask := 1; mask < (1 << 10); mask++ {
		var num int64
		for d := 9; d >= 0; d-- {
			if mask&(1<<d) != 0 {
				num = num*10 + int64(d)
			}
		}
		if num > 0 {
			set[num] = true
		}
	}
	goods := make([]int64, 0, len(set))
	for g := range set {
		goods = append(goods, g)
	}
	sort.Slice(goods, func(i, j int) bool { return goods[i] < goods[j] })

	// good[s] == 1 when the integer s is itself strictly monotone; those are
	// exactly the good digit sums (s in [1, 144]).
	good := make([]int, 145)
	for _, g := range goods {
		if g <= 144 {
			good[g] = 1
		}
	}

	// overlap[i]: among goods[0..i), how many also have a good digit sum
	overlap := make([]int64, len(goods)+1)
	for i, g := range goods {
		overlap[i+1] = overlap[i] + int64(good[digitSum(g)])
	}

	countFancyUpTo := func(x int64) int64 {
		// Fancy = good digits OR good digit sum; subtract the goods whose
		// digit sum is also good (counted by both terms).
		return countSumGood(x, good) + countGood(x, goods) - countOverlap(x, goods, overlap)
	}
	return countFancyUpTo(r) - countFancyUpTo(l-1)
}

func digitSum(n int64) int {
	s := 0
	for n > 0 {
		s += int(n % 10)
		n /= 10
	}
	return s
}

func countGood(x int64, goods []int64) int64 {
	lo := 0
	hi := len(goods)
	for lo < hi {
		mid := (lo + hi) / 2
		if goods[mid] <= x {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return int64(lo)
}

func countOverlap(x int64, goods []int64, overlap []int64) int64 {
	return overlap[countGood(x, goods)]
}

func countSumGood(x int64, good []int) int64 {
	// Numbers in [1, x] whose digit sum is a good sum.
	if x <= 0 {
		return 0
	}
	s := strconv.FormatInt(x, 10)
	n := len(s)
	// ways[k][t]: k free digits (0-9, leading zeros allowed) summing to
	// exactly t. Counts reach ~10^15, past 32 bits, so the table is int64.
	ways := make([][]int64, n+1)
	for i := range ways {
		ways[i] = make([]int64, 145)
	}
	ways[0][0] = 1
	for k := 1; k <= n; k++ {
		for t := 0; t <= 144; t++ {
			var total int64
			for d := 0; d <= 9; d++ {
				if t >= d {
					total += ways[k-1][t-d]
				}
			}
			ways[k][t] = total
		}
	}
	var result int64
	running := 0
	for i := 0; i < n; i++ {
		v := int(s[i] - '0')
		k := n - i - 1
		// A smaller digit here fixes the prefix; the tail is free.
		for d := 0; d < v; d++ {
			base := running + d
			limit := 9 * k
			if 144-base < limit {
				limit = 144 - base
			}
			for rem := 0; rem <= limit; rem++ {
				if good[base+rem] == 1 {
					result += ways[k][rem]
				}
			}
		}
		running += v
	}
	if good[running] == 1 {
		result++
	}
	return result
}
