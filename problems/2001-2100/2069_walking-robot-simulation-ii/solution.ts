class Robot {
    private width: number;
    private height: number;
    private perimeter: number;
    private index = 0;
    private moved = false;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.perimeter = 2 * (width + height) - 4;
    }

    step(num: number): void {
        this.index = (this.index + num) % this.perimeter;
        this.moved = true;
    }

    getPos(): number[] {
        if (this.index <= this.width - 1) return [this.index, 0];
        const rightEnd = this.width + this.height - 2;
        if (this.index <= rightEnd) return [this.width - 1, this.index - (this.width - 1)];
        const topEnd = 2 * this.width + this.height - 3;
        if (this.index <= topEnd) return [topEnd - this.index, this.height - 1];
        return [0, this.perimeter - this.index];
    }

    getDir(): string {
        if (!this.moved) return "East";
        if (this.index === 0) return "South";
        if (this.index <= this.width - 1) return "East";
        if (this.index <= this.width + this.height - 2) return "North";
        if (this.index <= 2 * this.width + this.height - 3) return "West";
        return "South";
    }
}
