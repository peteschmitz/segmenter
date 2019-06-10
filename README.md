# Segmenter

A very minimal javascript library with utilities for bucketing data (A/B testing, etc).


# Installation

```
npm i @~graphite/segmenter
```

# Examples

## Minimal

```javascript
import { NumberSegmenter } from "@~graphite/segmenter";

const segmenter = new NumberSegmenter();

segmenter.segment(0, ["A", "B"]); // "A"
segmenter.segment(1, ["A", "B"]); // "B"
segmenter.segment(2, ["A", "B"]); // "A"
segmenter.segment(5, ["A", "B", "C"]); // "C"
```

- Any bucket-type array should work

## Multi-dimensional

```javascript
import { NumberSegmenter } from "@~graphite/segmenter";

const segmenter = new NumberSegmenter();

segmenter.segments(0, ["A", "B"], ["X", "Y"]); // ["A", "X"]
segmenter.segments(1, ["A", "B"], ["X", "Y"]); // ["A", "Y"]
segmenter.segments(2, ["A", "B"], ["X", "Y"]); // ["B", "X"]
```

- Any number of dimensions are supported (with variable array lengths)


## Practical usage with Mongoose

- Include the [objectid segmenter](https://github.com/peteschmitz/segmenter-objectid)

```
npm i @~graphite/segmenter-objectid
```

```javascript
import { ObjectIdSegmenter } from "@~graphite/segmenter-objectid";

const segmenter = new ObjectIdSegmenter();

segmenter.segments(new ObjectId("xxxxxxxxxxxxxxxxxx000000"), ["A", "B"], ["X", "Y"]); // ["A", "X"]
segmenter.segments(new ObjectId("xxxxxxxxxxxxxxxxxx000001"), ["A", "B"], ["X", "Y"]); // ["A", "Y"]
segmenter.segments(new ObjectId("xxxxxxxxxxxxxxxxxx00000d"), ["A", "B"], ["X", "Y"]); // ["A", "Y"]
segmenter.segments(new ObjectId("xxxxxxxxxxxxxxxxxx00000e"), ["A", "B"], ["X", "Y"]); // ["B", "X"]

```

- Extensions are also supported for ObjectId:

```javascript
import "@~graphite/segmenter-objectid";

new ObjectId("xxxxxxxxxxxxxxxxxx000000").segments(["A", "B"], ["X", "Y"]); // ["A", "X"]
new ObjectId("xxxxxxxxxxxxxxxxxx000001").segments(["A", "B"], ["X", "Y"]); // ["A", "Y"]
new ObjectId("xxxxxxxxxxxxxxxxxx00000d").segments(["A", "B"], ["X", "Y"]); // ["A", "Y"]
new ObjectId("xxxxxxxxxxxxxxxxxx00000e").segments(["A", "B"], ["X", "Y"]); // ["B", "X"]

```

# Extending

- Defining behavior for a new segmenter is achieved by extending the [TypeSegmenter<T> class](src/TypeSegmenter.ts) and implementing the abstract method ```toSegment```. An example from the [NumberSegmenter](src/Segmenters/NumberSegmenter.ts):

```javascript
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
```
