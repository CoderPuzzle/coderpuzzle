function scheduleCourse(courses: number[][]): number {
    courses.sort((a, b) => a[1] - b[1]);
    const heap = new MaxHeap();
    let total = 0;
    for (const [duration, lastDay] of courses) {
        if (total + duration <= lastDay) {
            total += duration;
            heap.push(duration);
        } else if (heap.size() > 0 && heap.peek() > duration) {
            total += duration - heap.pop();
            heap.push(duration);
        }
    }
    return heap.size();
}

class MaxHeap {
    private a: number[] = [];
    size(): number {
        return this.a.length;
    }
    peek(): number {
        return this.a[0];
    }
    push(v: number): void {
        this.a.push(v);
        let i = this.a.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.a[p] >= this.a[i]) break;
            [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
            i = p;
        }
    }
    pop(): number {
        const top = this.a[0];
        const last = this.a.pop() as number;
        if (this.a.length) {
            this.a[0] = last;
            this.siftDown(0);
        }
        return top;
    }
    private siftDown(i: number): void {
        const n = this.a.length;
        while (true) {
            let l = 2 * i + 1,
                r = l + 1,
                m = i;
            if (l < n && this.a[l] > this.a[m]) m = l;
            if (r < n && this.a[r] > this.a[m]) m = r;
            if (m === i) break;
            [this.a[m], this.a[i]] = [this.a[i], this.a[m]];
            i = m;
        }
    }
}
