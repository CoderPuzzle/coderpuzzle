impl Solution {
    pub fn find_peaks(mountain: Vec<i32>) -> Vec<i32> {
        let n = mountain.len();
        let mut peaks = Vec::new();
        for i in 1..n - 1 {
            if mountain[i] > mountain[i - 1] && mountain[i] > mountain[i + 1] {
                peaks.push(i as i32);
            }
        }
        peaks
    }
}
