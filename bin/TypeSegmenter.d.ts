export interface SegmentResult {
    index: number;
    multiplier: number;
}
export declare abstract class TypeSegmenter<T> {
    /**
     *
     * @param value value to determine a segment for
     * @param segmentCount number of segment/buckets to choose from
     * @param segmentMultiplier recursive multiplier to evaluate on the segment
     * @returns index: zero-based segment index that was evaluated for the provided value [0, segmentCount),
     *          multiplier: current multiplier status after the evaluation
     */
    abstract toSegment(value: T, segmentCount: number, segmentMultiplier?: number): SegmentResult;
    /**
     *
     * @param value value to determine a segment for
     * @param array available segments to choose from
     * @returns a chosen segment element from the provided arary
     */
    segment<S>(value: T, array: S[]): S;
    /**
     *
     * @param value value to determine multiple segments for
     * @param arrays multi-dimensional segments to choose from
     * @returns an array with a selected element from each array, marching order is determined by
     *          the Type-implementation's toSegment() multiplier
     */
    segments<S>(value: T, ...arrays: S[][]): S[];
    /**
     * Sanity check for positive number
     *
     * @param value value to evaluate
     * @throws
     */
    protected positiveIntOrThrow(value: number, param?: string): void;
    /**
     * Sanity check for non-empty array
     *
     * @param value value to evaluate
     * @throws
     */
    protected validArrayOrThrow(value: any[], param?: string): void;
}
