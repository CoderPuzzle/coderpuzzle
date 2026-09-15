class RangeFreqQuery {
    constructor(arr) {
        this.positions = new Map();
        arr.forEach((value, index) => {
            const indices = this.positions.get(value);
            if (indices === undefined) {
                this.positions.set(value, [index]);
            } else {
                indices.push(index);
            }
        });
    }

    query(left, right, value) {
        const indices = this.positions.get(value) ?? [];
        return this.lowerBound(indices, right + 1) - this.lowerBound(indices, left);
    }

    lowerBound(indices, target) {
        let low = 0;
        let high = indices.length;
        while (low < high) {
            const middle = Math.floor((low + high) / 2);
            if (indices[middle] < target) low = middle + 1;
            else high = middle;
        }
        return low;
    }
}
