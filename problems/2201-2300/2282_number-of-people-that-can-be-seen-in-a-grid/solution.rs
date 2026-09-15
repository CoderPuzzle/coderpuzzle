impl Solution {
    pub fn see_people(heights: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = heights.len();
        let n = heights[0].len();
        let mut res = vec![vec![0i32; n]; m];

        // Count people visible to the right in each row.
        for i in 0..m {
            let mut st: Vec<i32> = Vec::with_capacity(n);
            for j in (0..n).rev() {
                let x = heights[i][j];
                let mut cnt = 0;
                while let Some(&top) = st.last() {
                    if top < x {
                        st.pop();
                        cnt += 1;
                    } else {
                        break;
                    }
                }
                if !st.is_empty() {
                    cnt += 1;
                }
                res[i][j] += cnt;
                while let Some(&top) = st.last() {
                    if top <= x {
                        st.pop();
                    } else {
                        break;
                    }
                }
                st.push(x);
            }
        }

        // Count people visible below in each column.
        for j in 0..n {
            let mut st: Vec<i32> = Vec::with_capacity(m);
            for i in (0..m).rev() {
                let x = heights[i][j];
                let mut cnt = 0;
                while let Some(&top) = st.last() {
                    if top < x {
                        st.pop();
                        cnt += 1;
                    } else {
                        break;
                    }
                }
                if !st.is_empty() {
                    cnt += 1;
                }
                res[i][j] += cnt;
                while let Some(&top) = st.last() {
                    if top <= x {
                        st.pop();
                    } else {
                        break;
                    }
                }
                st.push(x);
            }
        }

        res
    }
}
