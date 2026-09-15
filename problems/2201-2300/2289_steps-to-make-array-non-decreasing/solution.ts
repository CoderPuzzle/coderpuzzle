function totalSteps(nums: number[]): number {
    const st: [number, number][] = []; // pairs [value, step]
    let ans = 0;
    for (const x of nums) {
        let cur = 0;
        while (st.length && st[st.length - 1][0] <= x) {
            const popped = st.pop()![1];
            if (popped > cur) cur = popped;
        }
        if (st.length) cur += 1;
        else cur = 0;
        st.push([x, cur]);
        if (cur > ans) ans = cur;
    }
    return ans;
}
