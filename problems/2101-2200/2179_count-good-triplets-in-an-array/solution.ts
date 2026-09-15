function goodTriplets(nums1: number[], nums2: number[]): number {
    const n = nums1.length;
    const pos2: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
        pos2[nums2[i]] = i;
    }

    const tree: number[] = new Array(n + 1).fill(0); // Fenwick tree over positions in nums2

    const add = (i: number, delta: number): void => {
        i += 1;
        while (i <= n) {
            tree[i] += delta;
            i += i & -i;
        }
    };
    const prefixSum = (i: number): number => {
        // Sum over indices 0..i inclusive; returns 0 when i < 0.
        if (i < 0) {
            return 0;
        }
        i += 1;
        let total = 0;
        while (i > 0) {
            total += tree[i];
            i -= i & -i;
        }
        return total;
    };

    let answer = 0;
    for (let i = 0; i < n; i++) {
        const value = nums1[i];
        const p = pos2[value];
        const left = prefixSum(p - 1); // values before value in nums1 and in nums2
        // values after value in both arrays
        const right = n - 1 - p - (i - left);
        answer += left * right;
        add(p, 1);
    }
    return answer;
}
