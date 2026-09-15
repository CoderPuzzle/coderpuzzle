func minOperations(nums []int) int {
	n := len(nums)
	position := indexOf(nums, 0)
	targetKind := 0
	targetShift := position
	if !isRotationOfSorted(nums, position) {
		reversed := make([]int, n)
		for i := 0; i < n; i++ {
			reversed[i] = nums[n-i-1]
		}
		reversedPosition := indexOf(reversed, 0)
		if !isRotationOfSorted(reversed, reversedPosition) {
			return -1
		}
		targetKind = 1
		targetShift = reversedPosition
	}

	distance := make([][]int, 2)
	for i := range distance {
		distance[i] = make([]int, n)
		for j := range distance[i] {
			distance[i][j] = -1
		}
	}
	queue := []int{0}
	distance[0][0] = 0
	for head := 0; head < len(queue); head++ {
		state := queue[head]
		kind := state / n
		shift := state % n
		if kind == targetKind && shift == targetShift {
			return distance[kind][shift]
		}
		neighbors := [2][2]int{{kind, (shift + 1) % n}, {1 - kind, (n - shift) % n}}
		for _, neighbor := range neighbors {
			nextKind, nextShift := neighbor[0], neighbor[1]
			if distance[nextKind][nextShift] == -1 {
				distance[nextKind][nextShift] = distance[kind][shift] + 1
				queue = append(queue, nextKind*n+nextShift)
			}
		}
	}
	return -1
}

func indexOf(nums []int, target int) int {
	for i, value := range nums {
		if value == target {
			return i
		}
	}
	return -1
}

func isRotationOfSorted(nums []int, start int) bool {
	n := len(nums)
	for i := 0; i < n; i++ {
		if nums[(start+i)%n] != i {
			return false
		}
	}
	return true
}
