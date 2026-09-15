function resultArray(nums: number[]): number[] {
    // Compress distinct values to 1-based ranks for the two Fenwick trees.
    const vals = Array.from(new Set(nums)).sort((a, b) => a - b);
    const comp = new Map<number, number>();
    for (let i = 0; i < vals.length; i++) {
        comp.set(vals[i], i + 1);
    }
    const size = vals.length;
    const tree1 = new Array(size + 1).fill(0);
    const tree2 = new Array(size + 1).fill(0);

    function add(tree: number[], i: number, delta: number): void {
        while (i <= size) {
            tree[i] += delta;
            i += i & -i;
        }
    }

    function query(tree: number[], i: number): number {
        let s = 0;
        while (i > 0) {
            s += tree[i];
            i -= i & -i;
        }
        return s;
    }

    function greaterCount(tree: number[], length: number, x: number): number {
        return length - query(tree, comp.get(x)!);
    }

    // Seed both arrays and their trees with the first two elements.
    const arr1: number[] = [nums[0]];
    const arr2: number[] = [nums[1]];
    add(tree1, comp.get(nums[0])!, 1);
    add(tree2, comp.get(nums[1])!, 1);

    for (let i = 2; i < nums.length; i++) {
        const x = nums[i];
        // greaterCount = size - prefix count of ranks <= rank(x).
        const c1 = greaterCount(tree1, arr1.length, x);
        const c2 = greaterCount(tree2, arr2.length, x);
        if (c1 > c2) {
            arr1.push(x);
            add(tree1, comp.get(x)!, 1);
        } else if (c1 < c2) {
            arr2.push(x);
            add(tree2, comp.get(x)!, 1);
        } else {
            // Equal counts: shorter array wins; ties on length go to arr1.
            if (arr1.length <= arr2.length) {
                arr1.push(x);
                add(tree1, comp.get(x)!, 1);
            } else {
                arr2.push(x);
                add(tree2, comp.get(x)!, 1);
            }
        }
    }
    return arr1.concat(arr2);
}
