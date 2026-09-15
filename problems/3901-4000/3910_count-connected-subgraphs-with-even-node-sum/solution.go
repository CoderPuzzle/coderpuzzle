import "math/bits"

func evenSumSubgraphs(nums []int, edges [][]int) int {
	adjacency := make([]int, len(nums))
	for _, edge := range edges {
		adjacency[edge[0]] |= 1 << edge[1]
		adjacency[edge[1]] |= 1 << edge[0]
	}

	answer := 0
	for mask := 1; mask < 1<<len(nums); mask++ {
		parity := 0
		remaining := mask
		for remaining != 0 {
			bit := remaining & -remaining
			parity ^= nums[bits.TrailingZeros(uint(bit))]
			remaining ^= bit
		}
		if parity != 0 {
			continue
		}

		reached := mask & -mask
		frontier := reached
		for frontier != 0 {
			neighbors := 0
			remaining = frontier
			for remaining != 0 {
				bit := remaining & -remaining
				neighbors |= adjacency[bits.TrailingZeros(uint(bit))]
				remaining ^= bit
			}
			frontier = neighbors & mask & ^reached
			reached |= frontier
		}
		if reached == mask {
			answer++
		}
	}
	return answer
}
