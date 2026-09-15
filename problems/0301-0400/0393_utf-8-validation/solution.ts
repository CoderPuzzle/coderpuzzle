function validUtf8(data: number[]): boolean {
    // Only the least significant 8 bits of each integer are data, so mask
    // down to one byte before reading the leading bits.
    let remaining = 0;
    for (const value of data) {
        const b = value & 0xff;
        if (remaining === 0) {
            // The leader's top bits name its class: 0xxxxxxx (1 byte),
            // 110xxxxx (2), 1110xxxx (3), 11110xxx (4); a stray
            // continuation or the undefined 11111xxx is no leader at all.
            if ((b & 0xf8) === 0xf0) remaining = 3;
            else if ((b & 0xf0) === 0xe0) remaining = 2;
            else if ((b & 0xe0) === 0xc0) remaining = 1;
            else if ((b & 0x80) !== 0x00) return false;
        } else if ((b & 0xc0) !== 0x80) {
            // Every byte a leader owes must be a 10xxxxxx continuation.
            return false;
        } else {
            remaining--;
        }
    }
    // A leader cut short by the end of the input leaves bytes owed.
    return remaining === 0;
}
