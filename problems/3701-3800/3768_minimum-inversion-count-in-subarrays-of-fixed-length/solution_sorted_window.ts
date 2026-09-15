function minInversionCount(nums: number[], k: number): number {
    // Keep the current window as a sorted array. A sorted array makes the
    // slide's two rank questions direct binary searches: the position an
    // element occupies IS the number of elements smaller than it, and the
    // gap it is dropped into counts the elements greater than it. The
    // running inversion count moves by the same two terms the Fenwick tree
    // tracks, but each term is read off one bisection — no tree, no
    // compression, and the window itself stays materialized. The trade is
    // the O(k) element shift per insert and delete; with k up to n that is
    // quadratic in the worst case but so cache-friendly that mid-size
    // windows stay fast.
    //
    // Equal values need care at both ends: removing uses the leftmost
    // matching index so exactly one copy leaves, inserting uses the
    // rightmost so the newcomer lands after its equals and only pairs with
    // strictly larger survivors.
    const window: number[] = [];
    let inversions = 0;
    const lowerBound = (value: number): number => {
        let lo = 0;
        let hi = window.length;
        while (lo < hi) {
            const mid = lo + ((hi - lo) >> 1);
            if (window[mid] < value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };
    const upperBound = (value: number): number => {
        let lo = 0;
        let hi = window.length;
        while (lo < hi) {
            const mid = lo + ((hi - lo) >> 1);
            if (window[mid] <= value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };
    for (let i = 0; i < k; ++i) {
        const pos = upperBound(nums[i]);
        inversions += window.length - pos;
        window.splice(pos, 0, nums[i]);
    }
    let best = inversions;
    for (let right = k; right < nums.length; ++right) {
        const outPos = lowerBound(nums[right - k]);
        inversions -= outPos;
        window.splice(outPos, 1);
        const inPos = upperBound(nums[right]);
        inversions += window.length - inPos;
        window.splice(inPos, 0, nums[right]);
        if (inversions < best) {
            best = inversions;
        }
    }
    return best;
}
