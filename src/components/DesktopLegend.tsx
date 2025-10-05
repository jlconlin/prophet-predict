import {graphDataType} from '@/types';

export default function DesktopLegend({
  data,
}: {
  data: graphDataType[];
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

  // Sort by ordination date (oldest first)
  const sortedData = [...data].sort(
    (a, b) =>
      new Date(a.ordinationDate).getTime() -
      new Date(b.ordinationDate).getTime()
  );

  return (
    <div className="hidden md:block absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-4 min-w-[240px] z-10">
      <h3 className="text-sm font-semibold m-0 mb-3 text-gray-800">
        Apostles
      </h3>
      <div className="space-y-2">
        {sortedData.map((item) => {
          // Find the original index to get the correct color
          const originalIndex = data.findIndex((d) => d.id === item.id);
          return (
            <div key={item.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: colors[originalIndex % colors.length],
                }}
              />
              <span className="text-sm text-gray-700 leading-tight">
                {item.id}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
