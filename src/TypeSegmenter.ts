export interface SegmentResult {
    index: number;
    multiplier: number;
}

export abstract class TypeSegmenter<T> {

    /**
     * 
     * @param value value to determine a segment for
     * @param segmentCount number of segment/buckets to choose from
     * @param segmentMultiplier recursive multiplier to evaluate on the segment
     * @returns index: zero-based segment index that was evaluated for the provided value [0, segmentCount), 
     *          multiplier: current multiplier status after the evaluation
     */
    public abstract toSegment(value: T, segmentCount: number, segmentMultiplier?: number): SegmentResult;

    /**
     * 
     * @param value value to determine a segment for
     * @param array available segments to choose from
     * @returns a chosen segment element from the provided arary
     */
    public segment<S>(value: T, array: S[]): S {
        this.validArrayOrThrow(array, "segment-array");
        return array[this.toSegment(value, array.length).index];
    }

    /**
     * 
     * @param value value to determine multiple segments for
     * @param arrays multi-dimensional segments to choose from
     * @returns an array with a selected element from each array, marching order is determined by 
     *          the Type-implementation's toSegment() multiplier
     */
    public segments<S>(value: T, ...arrays: S[][]): S[] {
        const segments: S[] = [];
        let lastSegment: SegmentResult = null;
        arrays.reverse().forEach((array) => {
            this.validArrayOrThrow(array, "segments-array");
            lastSegment = this.toSegment(value, array.length, lastSegment ? lastSegment.multiplier : null);
            segments.push(array[lastSegment.index]);
        });
        return segments.reverse();
    }

    /**
     * Sanity check for positive number
     * 
     * @param value value to evaluate
     * @throws
     */
    protected positiveIntOrThrow(value: number, param: string = null): void {
        if (value === null ||
            value === undefined ||
            value < 0) {
            throw new Error(`Value empty or less than zero, expected non-null and greater-than zero ${param ? (`(param '${param})'`) : ""}.`);
        }
    }

    /**
     * Sanity check for non-empty array
     * 
     * @param value value to evaluate
     * @throws
     */
    protected validArrayOrThrow(value: any[], param: string = null): void {
        if (value === null ||
            value === undefined ||
            !Array.isArray(value) ||
            value.length === 0) {
            throw new Error(`Array empty or null, expected at least one element ${param ? (`(param '${param})'`) : ""}.`);
        }
    }
}
