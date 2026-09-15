function seePeople(heights: number[][]): number[][] {
    const m = heights.length;
    const n = heights[0].length;
    const res: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));

    // Count people visible to the right in each row.
    for (let i = 0; i < m; i++) {
        const st: number[] = [];
        for (let j = n - 1; j >= 0; j--) {
            const x = heights[i][j];
            let cnt = 0;
            while (st.length && st[st.length - 1] < x) {
                st.pop();
                cnt += 1;
            }
            if (st.length) cnt += 1;
            res[i][j] += cnt;
            while (st.length && st[st.length - 1] <= x) {
                st.pop();
            }
            st.push(x);
        }
    }

    // Count people visible below in each column.
    for (let j = 0; j < n; j++) {
        const st: number[] = [];
        for (let i = m - 1; i >= 0; i--) {
            const x = heights[i][j];
            let cnt = 0;
            while (st.length && st[st.length - 1] < x) {
                st.pop();
                cnt += 1;
            }
            if (st.length) cnt += 1;
            res[i][j] += cnt;
            while (st.length && st[st.length - 1] <= x) {
                st.pop();
            }
            st.push(x);
        }
    }

    return res;
}
