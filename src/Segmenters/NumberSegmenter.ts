import { SegmentResult, TypeSegmenter } from "../TypeSegmenter";

export class NumberSegmenter extends TypeSegmenter<number> {
    public toSegment(value: number, segmentCount: number, segmentMultiplier?: number): SegmentResult {
        this.positiveIntOrThrow(value, "value");
        this.positiveIntOrThrow(segmentCount, "segmentCount");

        const segmentResult = {
            index: 0,
            multiplier: segmentCount
        };

        // no buckets to choose from
        if (segmentCount === 0) {
            return segmentResult;
        }

        // multi-dimensional segment; we'll use the multiplier as a dividend
        if (segmentMultiplier && segmentMultiplier > 0) {
            value = Math.max(0, Math.floor(value / segmentMultiplier));
            segmentResult.multiplier = segmentResult.multiplier * segmentMultiplier;
        }

        // mod against overflow
        if (value >= segmentCount) {
            value = value % segmentCount;
        }

        segmentResult.index = value;

        return segmentResult;
    }
}
