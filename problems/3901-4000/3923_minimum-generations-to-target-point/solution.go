func minGenerations(points [][]int, target []int) int {
	size := 7
	total := size * size * size
	inf := 1 << 30
	best := make([]int, total)
	for i := range best {
		best[i] = inf
	}
	for _, point := range points {
		best[index3d(point[0], point[1], point[2], size)] = 0
	}

	changed := true
	for changed {
		changed = false
		for a := 0; a < total; a++ {
			if best[a] == inf {
				continue
			}
			ax := a / (size * size)
			ay := (a / size) % size
			az := a % size
			for b := a + 1; b < total; b++ {
				if best[b] == inf {
					continue
				}
				bx := b / (size * size)
				by := (b / size) % size
				bz := b % size
				nx := (ax + bx) / 2
				ny := (ay + by) / 2
				nz := (az + bz) / 2
				next := index3d(nx, ny, nz, size)
				candidate := max(best[a], best[b]) + 1
				if candidate < best[next] {
					best[next] = candidate
					changed = true
				}
			}
		}
	}

	answer := best[index3d(target[0], target[1], target[2], size)]
	if answer == inf {
		return -1
	}
	return answer
}

func index3d(x int, y int, z int, size int) int {
	return x*size*size + y*size + z
}
