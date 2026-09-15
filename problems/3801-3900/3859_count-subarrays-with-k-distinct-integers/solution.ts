class CountMinTree {
    size: number;
    inf: number;
    count: number[];
    minimum: number[];

    constructor(n: number) {
        this.size = 1;
        while (this.size < n + 1) {
            this.size *= 2;
        }
        this.inf = n + 1;
        this.count = new Array<number>(2 * this.size).fill(0);
        this.minimum = new Array<number>(2 * this.size).fill(this.inf);
    }

    update(position: number, active: boolean, mth: number = 0): void {
        let node = this.size + position;
        this.count[node] = active ? 1 : 0;
        this.minimum[node] = active ? mth : this.inf;
        for (node = Math.floor(node / 2); node > 0; node = Math.floor(node / 2)) {
            this.count[node] = this.count[2 * node] + this.count[2 * node + 1];
            this.minimum[node] = Math.min(this.minimum[2 * node], this.minimum[2 * node + 1]);
        }
    }

    kthLatest(need: number): number {
        let node = 1;
        while (node < this.size) {
            const right = 2 * node + 1;
            if (this.count[right] >= need) {
                node = right;
            } else {
                need -= this.count[right];
                node = right - 1;
            }
        }
        return node - this.size;
    }

    rangeMinimum(left: number, right: number): number {
        left += this.size;
        right += this.size;
        let result = this.inf;
        while (left <= right) {
            if (left % 2 === 1) {
                result = Math.min(result, this.minimum[left++]);
            }
            if (right % 2 === 0) {
                result = Math.min(result, this.minimum[right--]);
            }
            left = Math.floor(left / 2);
            right = Math.floor(right / 2);
        }
        return result;
    }
}

function countSubarrays(nums: number[], k: number, m: number): number {
    const n = nums.length;
    const tree = new CountMinTree(n);
    const history = new Map<number, number[]>();
    let answer = 0;

    for (let index = 0; index < n; ++index) {
        const right = index + 1;
        let places = history.get(nums[index]);
        if (places === undefined) {
            places = [];
            history.set(nums[index], places);
        }
        if (places.length > 0) {
            tree.update(places[places.length - 1], false);
        }
        places.push(right);
        const mth = places.length >= m ? places[places.length - m] : 0;
        tree.update(right, true, mth);

        if (tree.count[1] < k) {
            continue;
        }
        const lastK = tree.kthLatest(k);
        const lastNext = tree.count[1] > k ? tree.kthLatest(k + 1) : 0;
        const minMth = tree.rangeMinimum(lastK, n);
        answer += Math.max(0, Math.min(lastK, minMth) - lastNext);
    }
    return answer;
}
