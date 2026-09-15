// Bottom-up merge sort: no recursion and no library sort. A pass at width w
// merges every pair of adjacent sorted runs of length w from source into
// buffer, doubling the sorted-run length each pass; after ceil(log2 n) passes
// the whole array is one sorted run. The merge takes from the left run on
// ties, so equal values keep their relative order — the sort is stable.
impl Solution {
    pub fn sort_array(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut source = nums;
        let mut buffer = vec![0; n];
        let mut width = 1;
        while width < n {
            let mut start = 0;
            while start < n {
                let middle = (start + width).min(n);
                let end = (start + width * 2).min(n);
                let (mut i, mut j, mut k) = (start, middle, start);
                while i < middle && j < end {
                    if source[j] < source[i] {
                        buffer[k] = source[j];
                        j += 1;
                    } else {
                        buffer[k] = source[i];
                        i += 1;
                    }
                    k += 1;
                }
                while i < middle {
                    buffer[k] = source[i];
                    i += 1;
                    k += 1;
                }
                while j < end {
                    buffer[k] = source[j];
                    j += 1;
                    k += 1;
                }
                start += width * 2;
            }
            std::mem::swap(&mut source, &mut buffer);
            width *= 2;
        }
        source
    }
}
