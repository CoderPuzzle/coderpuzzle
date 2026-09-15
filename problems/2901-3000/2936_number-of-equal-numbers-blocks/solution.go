package main

type Solution struct{}

// Walk the blocks one at a time. From a known-equal index lo, gallop
// forward — lo+1, lo+2, lo+4, ... — until a probe misses the value or
// the array ends; that brackets the block boundary. All occurrences of
// a value are adjacent, so a value owns exactly one block and "still
// this value" is a monotone predicate; a binary search inside the
// bracket finds the block's last index. Positions are 64-bit; only the
// block count is returned, and that provably fits in 32 bits.
func (solution *Solution) countBlocks(nums *BigArray) int {
	n := nums.Size()
	blocks := 0
	i := int64(0)
	for i < n {
		value := nums.At(i)
		lo := i
		step := int64(1)
		hi := i + step
		for hi < n && nums.At(hi) == value {
			lo = hi
			step *= 2
			hi = i + step
		}
		if hi >= n {
			hi = n - 1
		}
		for lo < hi {
			mid := lo + (hi-lo+1)/2
			if nums.At(mid) == value {
				lo = mid
			} else {
				hi = mid - 1
			}
		}
		blocks++
		i = lo + 1
	}
	return blocks
}
