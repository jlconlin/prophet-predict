import {graphDataType} from '@/types';

export default function MobileLegend({
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
    <div className="p-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 overflow-y-auto flex-shrink-0 md:hidden">
      <h3 className="text-sm font-semibold m-0 mb-3 text-gray-800 dark:text-slate-100">Apostles</h3>
      <div className="grid grid-flow-col auto-rows-auto grid-rows-[repeat(7,auto)] grid-cols-2 gap-2 sm:grid-rows-[repeat(5,auto)] sm:grid-cols-3">
        {sortedData.map((item) => {
          // Find the original index to get the correct color
          const originalIndex = data.findIndex((d) => d.id === item.id);
          return (
            <div key={item.id} className="flex items-center gap-2">
              <div
                className="w-[10px] h-[10px] rounded-full flex-shrink-0"
                style={{
                  backgroundColor: colors[originalIndex % colors.length],
                }}
              />
              <span className="text-gray-700 dark:text-slate-300 leading-tight text-xs">{item.id}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
