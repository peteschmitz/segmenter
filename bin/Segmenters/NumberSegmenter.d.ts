import { SegmentResult, TypeSegmenter } from "../TypeSegmenter";
export declare class NumberSegmenter extends TypeSegmenter<number> {
    toSegment(value: number, segmentCount: number, segmentMultiplier?: number): SegmentResult;
}
