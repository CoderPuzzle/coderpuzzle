class Solution {
    findPattern(stream: InfiniteStream, pattern: number[]): number {
        const length = pattern.length;
        // Circular buffer of the last `length` bits: the newest bit
        // overwrites the oldest, and a full window is compared with the
        // pattern.
        const window: number[] = new Array(length).fill(0);
        let head = 0;
        let read = 0;
        for (;;) {
            window[head] = stream.next();
            head = (head + 1) % length;
            read += 1;
            if (read >= length) {
                let matches = true;
                for (let i = 0; i < length; i++) {
                    if (window[(head + i) % length] !== pattern[i]) {
                        matches = false;
                        break;
                    }
                }
                if (matches) {
                    return read - length;
                }
            }
        }
    }
}
