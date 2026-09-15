// A sparse vector keeps only its nonzero (index, value) pairs — the
// indices arrive in increasing order by construction — so a vector of
// length 1e5 with three nonzero entries stores three pairs. The dot
// product then merges the two sorted pair lists with two cursors: equal
// indices contribute one product and advance both cursors, a smaller
// index advances alone because its partner there is zero. The bound
// 1e5 * 100 * 100 = 1e9 is exact below 2^53 in Number arithmetic.
class SparseVector {
    constructor(nums) {
        this.pairs = [];
        for (let index = 0; index < nums.length; index++) {
            if (nums[index] !== 0) {
                this.pairs.push([index, nums[index]]);
            }
        }
    }

    // Return the dotProduct of two sparse vectors
    dotProduct(vec) {
        let total = 0;
        let left = 0;
        let right = 0;
        while (left < this.pairs.length && right < vec.pairs.length) {
            const [indexA, valueA] = this.pairs[left];
            const [indexB, valueB] = vec.pairs[right];
            if (indexA === indexB) {
                total += valueA * valueB;
                left++;
                right++;
            } else if (indexA < indexB) {
                left++;
            } else {
                right++;
            }
        }
        return total;
    }
}
