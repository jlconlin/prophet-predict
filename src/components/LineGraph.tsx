import {ResponsiveLine} from '@nivo/line';
import {timeYear} from 'd3-time';
import {timeFormat} from 'd3-time-format';
import {format} from 'd3-format';
import styles from './LineGraph.module.scss';
import {graphDataType, graphDataPointType} from '@/types';
import {useState, useEffect} from 'react';

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
  const timeYearResult = timeYear.every(1);
  if (!timeYearResult?.range) return <></>;
  const tickValuesAxisBottom = timeYearResult.range(
    new Date(data[0].data[0].x),
    new Date(data[0].data[data[0].data.length - 1].x)
  );

  return (
    <div className={styles.container}>
      <ResponsiveLine
        data={data}
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
        legends={
          isMobile
            ? []
            : [
                {
                  anchor: 'top-right',
                  direction: 'column',
                  justify: false,
                  translateX: isTablet ? -20 : -50,
                  translateY: 20,
                  itemsSpacing: 2,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 12,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
        }
        tooltip={({point}) => {
          const pointData = point.data as graphDataPointType;
          const formattedDate = new Date(pointData.x).toLocaleDateString();
          const formattedValue = format('.2%')(Number(pointData.y));
          const formattedAge = pointData.age;
          const formattedOrdinationDate = new Date(
            pointData.ordinationDate
          ).toLocaleDateString();

          return (
            <div
              style={{
                backgroundColor: 'white',
                padding: '10px',
                border: '1px solid #ccc',
              }}
            >
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
      />
    </div>
  );
}
