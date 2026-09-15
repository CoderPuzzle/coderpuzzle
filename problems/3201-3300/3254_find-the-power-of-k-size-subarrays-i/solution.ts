function resultsArray(nums: number[], k: number): number[] {
    // run counts the consecutive +1 steps ending at the current index; a
    // size-k window is powered iff its last k - 1 adjacent pairs all step
    // up by one, i.e. run reaches k - 1 at the window's end.
    const results: number[] = [];
    let run = 0;
    for (let i = 0; i < nums.length; i++) {
        run = i > 0 && nums[i] === nums[i - 1] + 1 ? run + 1 : 0;
        if (i >= k - 1) {
            results.push(run >= k - 1 ? nums[i] : -1);
        }
    }
    return results;
}
