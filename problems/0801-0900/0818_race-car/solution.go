func racecar(target int) int {
	bound := int64(2 * target)
	span := 4*bound + 1
	// Encode (pos, speed) as an integer key: speed lives in [-2*bound, 2*bound].
	encode := func(pos, speed int64) int64 {
		return (pos+bound)*span + (speed + 2*bound)
	}
	type state struct {
		pos   int64
		speed int64
	}
	queue := []state{{0, 1}}
	visited := make(map[int64]bool)
	visited[encode(0, 1)] = true
	head := 0
	steps := 0
	for head < len(queue) {
		levelEnd := len(queue)
		for head < levelEnd {
			cur := queue[head]
			head++
			pos, speed := cur.pos, cur.speed
			if pos == int64(target) {
				return steps
			}
			// Accelerate.
			np, ns := pos+speed, speed*2
			if -bound <= np && np <= bound && !visited[encode(np, ns)] {
				visited[encode(np, ns)] = true
				queue = append(queue, state{np, ns})
			}
			// Reverse.
			rs := int64(1)
			if speed > 0 {
				rs = -1
			}
			if !visited[encode(pos, rs)] {
				visited[encode(pos, rs)] = true
				queue = append(queue, state{pos, rs})
			}
		}
		steps++
	}
	return -1
}
