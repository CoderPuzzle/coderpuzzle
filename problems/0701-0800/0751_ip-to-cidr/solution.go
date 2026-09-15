import (
	"fmt"
	"math/bits"
	"strconv"
	"strings"
)

func ipToCIDR(ip string, n int) []string {
	// The address lives in an int64: 2^32 (the alignment cap at address 0)
	// must be representable, and a 32-bit type would wrap.
	var x int64
	for _, part := range strings.Split(ip, ".") {
		v, _ := strconv.ParseInt(part, 10, 64)
		x = x*256 + v
	}
	blocks := []string{}
	for n > 0 {
		// A block of 2^k addresses must start at an address divisible by
		// 2^k, and may not overrun the remaining count. So the largest
		// block at x is its lowest set bit (its own alignment), halved
		// down until it fits n; at address 0 nothing is set, so the whole
		// 2^32 space aligns and only n caps the block.
		block := x & -x
		if block == 0 {
			block = 1 << 32
		}
		for block > int64(n) {
			block >>= 1
		}
		prefix := 32 - bits.TrailingZeros64(uint64(block))
		blocks = append(blocks, fmt.Sprintf("%d.%d.%d.%d/%d", x>>24, (x>>16)&255, (x>>8)&255, x&255, prefix))
		x += block
		n -= int(block)
	}
	return blocks
}
