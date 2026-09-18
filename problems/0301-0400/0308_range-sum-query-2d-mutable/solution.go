package main

// NumMatrix tracks region sums in a 2D Fenwick tree: cell (i, j)
// sums the rectangle i & -i rows tall and j & -j columns wide ending at
// (i, j). 1-based in both dims, row/column 0 unused so the low-bit
// arithmetic is valid.
type NumMatrix struct {
	m      int
	n      int
	matrix [][]int
	tree   [][]int64
}

func NewNumMatrixTyped(matrix [][]int) *NumMatrix {
	m := len(matrix)
	n := len(matrix[0])
	design := &NumMatrix{
		m:      m,
		n:      n,
		matrix: make([][]int, m),
		tree:   make([][]int64, m+1),
	}
	for i, source := range matrix {
		design.matrix[i] = append([]int(nil), source...)
	}
	for i := range design.tree {
		design.tree[i] = make([]int64, n+1)
	}
	// O(m*n) build: each source row becomes a 1D Fenwick row in one pass,
	// every finished block pushed into its parent column.
	for i := 1; i <= m; i++ {
		row := make([]int64, n+1)
		source := design.matrix[i-1]
		for j := 1; j <= n; j++ {
			row[j] += int64(source[j-1])
			parent := j + (j & -j)
			if parent <= n {
				row[parent] += row[j]
			}
		}
		// The finished row is added into its own tree slot, then pushed
		// whole into the parent row's slot.
		treeRow := design.tree[i]
		for j := 1; j <= n; j++ {
			treeRow[j] += row[j]
		}
		parentRow := i + (i & -i)
		if parentRow <= m {
			target := design.tree[parentRow]
			for j := 1; j <= n; j++ {
				target[j] += treeRow[j]
			}
		}
	}
	return design
}

func (design *NumMatrix) update(row int, col int, value int) {
	// Only the delta is applied; the matrix copy keeps later deltas right.
	delta := int64(value) - int64(design.matrix[row][col])
	design.matrix[row][col] = value
	// Dual climb over rows and columns visits exactly the tree cells whose
	// stored rectangle contains the written cell.
	for i := row + 1; i <= design.m; i += i & -i {
		treeRow := design.tree[i]
		for j := col + 1; j <= design.n; j += j & -j {
			treeRow[j] += delta
		}
	}
}

func (design *NumMatrix) sumRegion(top int, left int, bottom int, right int) int64 {
	// Inclusion-exclusion over four top-left-anchored prefix rectangles.
	return design.prefix(bottom+1, right+1) - design.prefix(top, right+1) -
		design.prefix(bottom+1, left) + design.prefix(top, left)
}

func (design *NumMatrix) prefix(rows int, cols int) int64 {
	total := int64(0)
	// Strip low bits from the row index, and within each row strip from the
	// column index; the disjoint rectangles exactly tile the region.
	for i := rows; i > 0; i -= i & -i {
		treeRow := design.tree[i]
		for j := cols; j > 0; j -= j & -j {
			total += treeRow[j]
		}
	}
	return total
}
