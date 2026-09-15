function findMaximums(nums: number[]): number[] {
    const n = nums.length;
    const left: number[] = new Array(n);
    const right: number[] = new Array(n);
    // Nearest strictly smaller element on each side. Popping on >= (not just
    // >) deliberately splits spans at equal values so every duplicate owns
    // the sub-window where it is the minimum.
    let stack: number[] = [];
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
            stack.pop();
        }
        left[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
        stack.push(i);
    }
    stack = [];
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
            stack.pop();
        }
        right[i] = stack.length > 0 ? stack[stack.length - 1] : n;
        stack.push(i);
    }
    const ans: number[] = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        // nums[i] is the minimum of any window within its maximal span, so
        // it seeds that length (max wins when spans collide).
        const length = right[i] - left[i] - 1;
        if (nums[i] > ans[length - 1]) {
            ans[length - 1] = nums[i];
        }
    }
    // Seeding covers only maximal spans: a size-(k+1) window contains a
    // size-k sub-window with a no-smaller minimum, so answers are monotone
    // and this suffix max repairs every shorter length with the best
    // longer-span guarantee.
    for (let i = n - 2; i >= 0; i--) {
        if (ans[i + 1] > ans[i]) {
            ans[i] = ans[i + 1];
        }
    }
    return ans;
}
