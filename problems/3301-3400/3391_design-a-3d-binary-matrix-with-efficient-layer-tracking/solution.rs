use std::collections::BinaryHeap;

// Layer one-counts live in an array beside a max-heap of (count, x)
// pairs; every count change pushes a fresh pair, so the top always
// holds the largest live count with ties broken toward the larger
// index, and pairs left stale by later changes are discarded only when
// they surface at the top. The cell grid answers set and unset in O(1)
// and keeps repeated sets or unsets from skewing the counts. Each call
// costs O(log) heap work. BinaryHeap is already a max-heap, so the
// pairs are stored as-is.
pub struct Matrix3D {
    n: usize,
    counts: Vec<i32>,
    cells: Vec<Vec<u8>>,
    heap: BinaryHeap<(i32, i32)>,
}

impl Matrix3D {
    pub fn new(n: i32) -> Self {
        let n = n as usize;
        let mut heap = BinaryHeap::new();
        for x in 0..n as i32 {
            heap.push((0, x));
        }
        Matrix3D {
            n,
            counts: vec![0; n],
            cells: vec![vec![0; n * n]; n],
            heap,
        }
    }

    pub fn setCell(&mut self, x: i32, y: i32, z: i32) {
        let (x, idx) = (x as usize, (y as usize) * self.n + z as usize);
        if self.cells[x][idx] == 1 {
            return;
        }
        self.cells[x][idx] = 1;
        self.counts[x] += 1;
        self.heap.push((self.counts[x], x as i32));
    }

    pub fn unsetCell(&mut self, x: i32, y: i32, z: i32) {
        let (x, idx) = (x as usize, (y as usize) * self.n + z as usize);
        if self.cells[x][idx] == 0 {
            return;
        }
        self.cells[x][idx] = 0;
        self.counts[x] -= 1;
        self.heap.push((self.counts[x], x as i32));
    }

    pub fn largestMatrix(&mut self) -> i32 {
        // The live pair of the true maximum is always present, so the
        // stale entries above it run out.
        while let Some(&(count, x)) = self.heap.peek() {
            if count == self.counts[x as usize] {
                break;
            }
            self.heap.pop();
        }
        self.heap.peek().expect("nonempty").1
    }
}
