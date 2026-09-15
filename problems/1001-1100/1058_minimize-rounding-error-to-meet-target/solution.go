import (
	"fmt"
	"sort"
	"strconv"
	"strings"
)

func minimizeError(prices []string, target int) string {
	// Work entirely in integer thousandths so nothing ever touches a
	// float: "1.500" splits into an integer part (the floor) and a
	// 3-digit fractional part (in [0, 1000)).
	sumFloors := 0
	fracs := []int{}
	for _, price := range prices {
		dot := strings.IndexByte(price, '.')
		floorVal, _ := strconv.Atoi(price[:dot])
		fracVal, _ := strconv.Atoi(price[dot+1:])
		sumFloors += floorVal
		if fracVal != 0 {
			fracs = append(fracs, fracVal)
		}
	}

	countNonint := len(fracs)
	sumCeils := sumFloors + countNonint
	if target < sumFloors || target > sumCeils {
		return "-1"
	}

	// Flooring everything reaches sumFloors; each fractional price
	// switched to its ceiling adds exactly 1, so exactly k of them must
	// switch.
	k := target - sumFloors

	// Switching a price with fractional part f changes its error
	// contribution from f to (1000 - f): cheapest for the largest f.
	// Flip the k largest fractions first.
	baseError := 0
	for _, f := range fracs {
		baseError += f
	}
	sort.Sort(sort.Reverse(sort.IntSlice(fracs)))
	sumFlip := 0
	for i := 0; i < k; i++ {
		sumFlip += fracs[i]
	}
	totalError := baseError + k*1000 - 2*sumFlip

	return fmt.Sprintf("%d.%03d", totalError/1000, totalError%1000)
}
