// Two stacks split at the cursor: left holds the text before the cursor
// bottom-to-top, right the text after it nearest-char-on-top, so the
// characters adjacent to the cursor are always the two ends.
class TextEditor {
    private left: string[] = [];
    private right: string[] = [];

    constructor() {}

    addText(text: string): void {
        for (const ch of text) {
            this.left.push(ch);
        }
    }

    deleteText(k: number): number {
        const deleted = Math.min(k, this.left.length);
        this.left.length -= deleted;
        return deleted;
    }

    cursorLeft(k: number): string {
        const moved = Math.min(k, this.left.length);
        for (let i = 0; i < moved; i++) {
            this.right.push(this.left.pop());
        }
        return this.tail();
    }

    cursorRight(k: number): string {
        const moved = Math.min(k, this.right.length);
        for (let i = 0; i < moved; i++) {
            this.left.push(this.right.pop());
        }
        return this.tail();
    }

    private tail(): string {
        return this.left.slice(-10).join("");
    }
}
