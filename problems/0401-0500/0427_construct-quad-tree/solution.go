func construct(grid [][]int) *QuadNode {
	var build func(r0, c0, size int) *QuadNode
	build = func(r0, c0, size int) *QuadNode {
		first := grid[r0][c0]
		uniform := true
	scan:
		for r := r0; r < r0+size; r++ {
			for c := c0; c < c0+size; c++ {
				if grid[r][c] != first {
					uniform = false
					break scan
				}
			}
		}
		if uniform {
			return &QuadNode{Val: first == 1, IsLeaf: true}
		}
		half := size / 2
		return &QuadNode{
			TopLeft:     build(r0, c0, half),
			TopRight:    build(r0, c0+half, half),
			BottomLeft:  build(r0+half, c0, half),
			BottomRight: build(r0+half, c0+half, half),
		}
	}
	return build(0, 0, len(grid))
}
