import {graphDataType, graphDataPointType} from '@/types';
import {format} from 'd3-format';

type HoverData = {
  date: string;
  points: Array<{
    id: string;
    serieColor: string;
    data: graphDataPointType;
  }>;
} | null;

export default function MobileLegend({
  data,
  hoverData,
}: {
  data: graphDataType[];
  hoverData: HoverData;
}): JSX.Element {
  const colors = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
    '#aec7e8',
    '#ffbb78',
    '#98df8a',
    '#ff9896',
  ];

  // If hovering, sort by probability (highest first), otherwise by ordination date
  const displayData = hoverData
    ? hoverData.points.sort((a, b) => Number(b.data.y) - Number(a.data.y))
    : [...data]
        .sort(
          (a, b) =>
            new Date(a.ordinationDate).getTime() -
            new Date(b.ordinationDate).getTime()
        )
        .map((item) => {
          const originalIndex = data.findIndex((d) => d.id === item.id);
          return {
            id: item.id,
            serieColor: colors[originalIndex % colors.length],
            data: null,
          };
        });

  return (
    <div className="p-3 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 overflow-y-auto flex-shrink-0 md:hidden">
      <h3 className="text-xs font-semibold m-0 mb-2 text-gray-800 dark:text-slate-100">
        Apostles
        {hoverData && (
          <span className="text-[10px] font-normal text-gray-500 dark:text-slate-400 ml-1.5">
            {new Date(hoverData.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        )}
      </h3>
      <div className="grid grid-flow-col auto-rows-auto grid-rows-[repeat(7,auto)] grid-cols-2 gap-x-3 gap-y-1.5 sm:grid-rows-[repeat(5,auto)] sm:grid-cols-3">
        {displayData.map((item) => {
          // Find the original index to get the correct color
          const originalIndex = data.findIndex((d) => d.id === item.id);
          const color = colors[originalIndex % colors.length];
          const pointData = item.data as graphDataPointType | null;

          return (
            <div key={item.id} className="flex items-center gap-1.5 min-w-0 h-[28px]">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: item.serieColor || color,
                }}
              />
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="text-gray-700 dark:text-slate-300 leading-tight text-[11px] truncate">
                  {item.id}
                </div>
                <div className="text-[9px] text-gray-500 dark:text-slate-400 tabular-nums leading-tight h-[11px]">
                  {pointData ? (
                    <>{pointData.age}y · {format('.1%')(Number(pointData.y))}</>
                  ) : (
                    <>&nbsp;</>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
