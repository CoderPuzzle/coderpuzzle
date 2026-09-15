impl Solution {
    pub fn max_free_time(eventTime: i32, startTime: Vec<i32>, endTime: Vec<i32>) -> i32 {
        // Removing meeting i frees the span between its neighbours, which is
        // g[i] + d + g[i+1] long with g the gaps around it. If i fits into a
        // gap OTHER than its two flanking ones, that whole span becomes free
        // time; otherwise i can only slide inside it, leaving g[i] + g[i+1]
        // free. Prefix/suffix maxima over the gap array make "largest
        // non-flanking gap" an O(1) lookup, so the scan stays linear.
        let n = startTime.len();
        let mut gaps = vec![0; n + 1];
        gaps[0] = startTime[0];
        for i in 1..n {
            gaps[i] = startTime[i] - endTime[i - 1];
        }
        gaps[n] = eventTime - endTime[n - 1];
        let mut prefix = vec![0; n + 2];
        for i in 0..=n {
            prefix[i + 1] = prefix[i].max(gaps[i]);
        }
        let mut suffix = vec![0; n + 2];
        for i in (0..=n).rev() {
            suffix[i] = suffix[i + 1].max(gaps[i]);
        }
        let mut answer = *gaps.iter().max().unwrap();
        for i in 0..n {
            let duration = endTime[i] - startTime[i];
            // Largest gap outside i's two flanking gaps decides move vs slide.
            let host = prefix[i].max(suffix[i + 2]);
            let merged = gaps[i] + gaps[i + 1];
            let candidate = if host >= duration { merged + duration } else { merged };
            answer = answer.max(candidate);
        }
        answer
    }
}
