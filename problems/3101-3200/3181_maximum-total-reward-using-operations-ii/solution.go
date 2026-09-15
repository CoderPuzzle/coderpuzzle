import (
	"math/big"
	"sort"
)

func maxTotalReward(rewardValues []int) int {
	values := make([]int, len(rewardValues))
	copy(values, rewardValues)
	sort.Ints(values)
	uniq := values[:0]
	for i, v := range values {
		if i == 0 || v != values[i-1] {
			uniq = append(uniq, v)
		}
	}
	values = uniq

	dp := big.NewInt(1)
	mask := new(big.Int)
	tmp := new(big.Int)
	for _, x := range values {
		mask.Sub(mask.Lsh(big.NewInt(1), uint(x)), big.NewInt(1))
		tmp.And(dp, mask)
		tmp.Lsh(tmp, uint(x))
		dp.Or(dp, tmp)
	}
	return dp.BitLen() - 1
}
