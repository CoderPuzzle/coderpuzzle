#[derive(Clone, Copy)]
struct Item {
    g: f64,
    p: i64,
    t: i64,
}

impl Solution {
    pub fn max_average_ratio(classes: Vec<Vec<i32>>, extra_students: i32) -> f64 {
        let mut heap: Vec<Item> = classes
            .iter()
            .map(|c| {
                let p = c[0] as i64;
                let t = c[1] as i64;
                Item {
                    g: -Self::gain(p, t),
                    p,
                    t,
                }
            })
            .collect();
        // Average over a fixed class count, so maximize the ratio sum: one
        // more student in class (p, t) gains (p+1)/(t+1) - p/t, and that
        // marginal gain shrinks as the class grows — allocate each identical
        // student where it buys the most.
        Self::heapify(&mut heap);
        for _ in 0..extra_students {
            let top = Self::heappop(&mut heap);
            let p = top.p + 1;
            let t = top.t + 1;
            // Re-push: after absorbing a student the class's gain drops and
            // another class may now offer the best marginal return.
            Self::heappush(
                &mut heap,
                Item {
                    g: -Self::gain(p, t),
                    p,
                    t,
                },
            );
        }
        // Python's sum() uses Neumaier compensated summation for floats; mirror it
        // so the final average is bit-identical to the reference.
        let mut f = heap[0].p as f64 / heap[0].t as f64;
        let mut c = 0.0f64;
        for i in 1..heap.len() {
            let x = heap[i].p as f64 / heap[i].t as f64;
            let t = f + x;
            if f.abs() >= x.abs() {
                c += (f - t) + x;
            } else {
                c += (x - t) + f;
            }
            f = t;
        }
        (f + c) / heap.len() as f64
    }

    // The heap below is a literal port of CPython's heapq so the array layout —
    // and therefore the final summation order — matches the Python reference exactly.
    fn gain(p: i64, t: i64) -> f64 {
        (p + 1) as f64 / (t + 1) as f64 - p as f64 / t as f64
    }

    fn less(a: &Item, b: &Item) -> bool {
        if a.g != b.g {
            return a.g < b.g;
        }
        if a.p != b.p {
            return a.p < b.p;
        }
        a.t < b.t
    }

    fn sift_up(heap: &mut Vec<Item>, pos0: usize) {
        let endpos = heap.len();
        let startpos = pos0;
        let newitem = heap[pos0];
        let mut pos = pos0;
        let mut childpos = 2 * pos + 1;
        while childpos < endpos {
            let rightpos = childpos + 1;
            if rightpos < endpos && !Self::less(&heap[childpos], &heap[rightpos]) {
                childpos = rightpos;
            }
            heap[pos] = heap[childpos];
            pos = childpos;
            childpos = 2 * pos + 1;
        }
        heap[pos] = newitem;
        Self::sift_down(heap, startpos, pos);
    }

    fn sift_down(heap: &mut Vec<Item>, startpos: usize, pos0: usize) {
        let newitem = heap[pos0];
        let mut pos = pos0;
        while pos > startpos {
            let parentpos = (pos - 1) >> 1;
            let parent = heap[parentpos];
            if Self::less(&newitem, &parent) {
                heap[pos] = parent;
                pos = parentpos;
                continue;
            }
            break;
        }
        heap[pos] = newitem;
    }

    fn heapify(heap: &mut Vec<Item>) {
        let n = heap.len();
        for i in (0..n / 2).rev() {
            Self::sift_up(heap, i);
        }
    }

    fn heappush(heap: &mut Vec<Item>, it: Item) {
        heap.push(it);
        Self::sift_down(heap, 0, heap.len() - 1);
    }

    fn heappop(heap: &mut Vec<Item>) -> Item {
        let lastelt = heap.pop().unwrap();
        if !heap.is_empty() {
            let returnitem = heap[0];
            heap[0] = lastelt;
            Self::sift_up(heap, 0);
            return returnitem;
        }
        lastelt
    }
}
