import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SkiaRenderer, SkiaChart } from '@wuba/react-native-echarts';

// echarts.use([SkiaRenderer, LineChart, GridComponent]);

interface Numbers{
  message: number [];
}
// export default function Graph({message}:Numbers) {
export default function Graph() {
  let data = [3,4,1,5]
  const now = new Date();
  const timeStamps = data.map((_, i) => {
    const d = new Date(now.getTime() + i * 1000);
    return d.toLocaleTimeString([], { hour12: false });
  });

  const option = {
    xAxis: {
      type: 'category',
      data: timeStamps,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data,
        type: 'line',
        smooth: true,
      },
    ],
  };

  return <SkiaChart option={option} />;
}