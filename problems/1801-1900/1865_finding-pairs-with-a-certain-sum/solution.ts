class FindSumPairs {
    // nums2 changes but nums1 never does, so keep a frequency map of nums2
    // and scan the short nums1 on every count: for each a in nums1 add
    // freq2[tot - a]. An add updates one slot plus its two frequency entries.
    private nums1: number[];
    private nums2: number[];
    private freq2: Map<number, number>;

    constructor(nums1: number[], nums2: number[]) {
        this.nums1 = nums1;
        this.nums2 = nums2;
        this.freq2 = new Map();
        for (const v of nums2) {
            this.freq2.set(v, (this.freq2.get(v) ?? 0) + 1);
        }
    }

    add(index: number, val: number): void {
        const old = this.nums2[index];
        this.freq2.set(old, this.freq2.get(old)! - 1);
        const now = old + val;
        this.nums2[index] = now;
        this.freq2.set(now, (this.freq2.get(now) ?? 0) + 1);
    }

    count(tot: number): number {
        let total = 0;
        for (const a of this.nums1) {
            total += this.freq2.get(tot - a) ?? 0;
        }
        return total;
    }
}
