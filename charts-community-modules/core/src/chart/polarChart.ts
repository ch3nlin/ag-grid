import { Chart } from "./chart";
import { Node } from "../scene/node";
import { PolarSeries } from "./series/polar/polarSeries";

export class PolarChart extends Chart {
    static className = 'PolarChart';

    constructor(document = window.document) {
        super(document);

        this.scene.root!.append(this.legend.group);
    }

    get seriesRoot(): Node {
        return this.scene.root!;
    }

    performLayout(): void {
        const shrinkRect = {
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        };

        this.positionCaptions();
        this.positionLegend();

        const captionAutoPadding = this.captionAutoPadding;
        shrinkRect.y += captionAutoPadding;
        shrinkRect.height -= captionAutoPadding;

        if (this.legend.enabled && this.legend.data.length) {
            const legendAutoPadding = this.legendAutoPadding;
            shrinkRect.x += legendAutoPadding.left;
            shrinkRect.y += legendAutoPadding.top;
            shrinkRect.width -= legendAutoPadding.left + legendAutoPadding.right;
            shrinkRect.height -= legendAutoPadding.top + legendAutoPadding.bottom;

            const legendPadding = this.legend.padding;
            switch (this.legend.position) {
                case 'right':
                    shrinkRect.width -= legendPadding;
                    break;
                case 'bottom':
                    shrinkRect.height -= legendPadding;
                    break;
                case 'left':
                    shrinkRect.x += legendPadding;
                    shrinkRect.width -= legendPadding;
                    break;
                case 'top':
                    shrinkRect.y += legendPadding;
                    shrinkRect.height -= legendPadding;
                    break;
            }
        }

        const padding = this.padding;
        shrinkRect.x += padding.left;
        shrinkRect.y += padding.top;
        shrinkRect.width -= padding.left + padding.right;
        shrinkRect.height -= padding.top + padding.bottom;

        const centerX = shrinkRect.x + shrinkRect.width / 2;
        const centerY = shrinkRect.y + shrinkRect.height / 2;
        const radius = Math.min(shrinkRect.width, shrinkRect.height) / 2;

        this.series.forEach(series => {
            if (series instanceof PolarSeries) {
                series.centerX = centerX;
                series.centerY = centerY;
                series.radius = radius;
                series.update();
            }
        });
    }
}
