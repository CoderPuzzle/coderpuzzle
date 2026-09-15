function longestDecomposition(text: string): number {
    const n = text.length;
    let count = 0;
    let left = 0;
    let right = n;
    while (left < right) {
        let size = 1;
        let matched = false;
        // prefix and suffix of equal size must not overlap
        while (left + size <= right - size) {
            if (text.slice(left, left + size) === text.slice(right - size, right)) {
                // shortest matching pair first: an exchange argument shows
                // splitting a longer pair here never lowers the count
                count += 2;
                left += size;
                right -= size;
                matched = true;
                break;
            }
            size += 1;
        }
        if (!matched) {
            // no size pairs: the entire remainder is one final chunk
            count += 1;
            break;
        }
    }
    return count;
}
