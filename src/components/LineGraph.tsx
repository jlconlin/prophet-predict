import {ResponsiveLine} from '@nivo/line';
import {timeYear} from 'd3-time';
import {timeFormat} from 'd3-time-format';
import {format} from 'd3-format';
import {graphDataType, graphDataPointType} from '@/types';
import {useState, useEffect} from 'react';
import DesktopLegend from './DesktopLegend';

export default function LineGraph({
  data,
}: {
  data: graphDataType[];
}): JSX.Element {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!data) return <></>;
  if (!data[0]) return <></>;

  // Sort data by ordination date (oldest/longest serving first)
  // Reversed for nivo legend which displays bottom-to-top
  const sortedData = [...data].sort(
    (a, b) =>
      new Date(b.ordinationDate).getTime() -
      new Date(a.ordinationDate).getTime()
  );

  const timeYearResult = timeYear.every(1);
  if (!timeYearResult?.range) return <></>;
  const tickValuesAxisBottom = timeYearResult.range(
    new Date(sortedData[0].data[0].x),
    new Date(sortedData[0].data[sortedData[0].data.length - 1].x)
  );

  return (
    <div className="w-full flex-1 min-h-0 md:min-h-[250px] sm:min-h-[400px] lg:min-h-[500px] lg:min-w-[800px] relative">
      <DesktopLegend data={data} />
      <ResponsiveLine
        data={sortedData}
        margin={
          isMobile
            ? {top: 10, right: 10, bottom: 40, left: 40}
            : isTablet
            ? {top: 30, right: 20, bottom: 45, left: 50}
            : {top: 50, right: 25, bottom: 50, left: 60}
        }
        xScale={{
          format: '%Y-%m-%d',
          type: 'time',
          min: 'auto',
          max: 'auto',
        }}
        yScale={{type: 'linear', stacked: false, min: 'auto', max: 'auto'}}
        yFormat=" >-.2%"
        curve="natural"
        axisTop={null}
        axisBottom={{
          tickValues: isMobile
            ? tickValuesAxisBottom.filter((_, i) => i % 2 === 0)
            : tickValuesAxisBottom,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: isMobile ? -45 : 0,
          format: timeFormat('%Y'),
          legend: isMobile ? '' : 'Year',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickValues: isMobile
            ? [0, 0.25, 0.5, 0.75, 1]
            : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: (value) => `${value * 100}%`,
          legend: isMobile ? '' : 'Prophet Probability',
          legendOffset: isMobile ? -35 : -40,
          legendPosition: 'middle',
        }}
        enableGridX={false}
        colors={{scheme: 'category10'}}
        lineWidth={isMobile ? 2 : 1}
        enablePoints={false}
        pointSize={4}
        pointColor={{theme: 'background'}}
        pointBorderWidth={1}
        pointBorderColor={{from: 'serieColor'}}
        pointLabelYOffset={-12}
        useMesh={true}
        gridXValues={[0, 20, 40, 60, 80, 100, 120]}
        gridYValues={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
        legends={[]}
        theme={{
          tooltip: {
            container: {
              background: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              padding: '12px',
              maxWidth: '20rem',
              maxHeight: '80vh',
              overflow: 'auto',
            },
          },
        }}
        tooltip={({point}) => {
          const pointData = point.data as graphDataPointType;
          const formattedDate = new Date(pointData.x).toLocaleDateString();
          const formattedValue = format('.2%')(Number(pointData.y));
          const formattedAge = pointData.age;
          const formattedOrdinationDate = new Date(
            pointData.ordinationDate
          ).toLocaleDateString();

          return (
            <div className="bg-white p-3 border border-gray-300 shadow-lg rounded">
              <strong>{point.serieId}</strong>
              <br />
              Age: {formattedAge}
              <br />
              Ordination date: {formattedOrdinationDate}
              <br />
              Date: {formattedDate}
              <br />
              Value: {formattedValue}
            </div>
          );
        }}
        enableSlices="x"
        sliceTooltip={({slice}) => {
          // Sort points by probability (highest first)
          const sortedPoints = [...slice.points].sort(
            (a, b) => Number(b.data.y) - Number(a.data.y)
          );

          return (
            <div className="flex flex-col bg-white border border-gray-300 rounded shadow-lg">
              <div className="p-3" style={{minWidth: '200px'}}>
                {sortedPoints.map((point) => {
                  const pointData = point.data as graphDataPointType;
                  const formattedValue = format('.2%')(Number(pointData.y));
                  const formattedAge = pointData.age;

                  return (
                    <div key={point.id} className="mb-2 last:mb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{backgroundColor: point.serieColor}}
                        />
                        <strong className="text-sm">{point.serieId}</strong>
                      </div>
                      <div className="text-xs text-gray-600 ml-5">
                        Age: {formattedAge} | Probability: {formattedValue}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-3 py-2 border-t border-gray-200 text-xs text-gray-500 bg-gray-50">
                {new Date(slice.points[0].data.x).toLocaleDateString()}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
