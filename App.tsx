import React from 'react';
import {StyleSheet, View} from 'react-native';

import BarChart from './components/BarChart';
import Chart from './components/Chart';
import DonutChart from './components/DonutChart';
import PieChart from './components/PieChart';
import PieChart2 from './components/PieChart2';

const App = (props: Props) => {
  const data1 = [
    {label: 'Jan', value: 500},
    {label: 'Feb', value: 312},
    {label: 'Mar', value: 424},
    {label: 'Apr', value: 745},
    {label: 'May', value: 89},
    {label: 'Jun', value: 434},
    {label: 'Jul', value: 650},
    {label: 'Aug', value: 980},
    {label: 'Sep', value: 123},
    {label: 'Oct', value: 186},
    {label: 'Nov', value: 689},
    {label: 'Dec', value: 643},
  ];

  const data2 = [
    {
      percentage: 8,
      color: 'tomato',
      max: 10,
    },
    {
      percentage: 14,
      color: 'skyblue',
      max: 20,
    },
    {
      percentage: 92,
      color: 'gold',
      max: 100,
    },
    {
      percentage: 240,
      color: '#222',
      max: 500,
      radius: 200,
      strokeWidth: 40,
    },
  ];

  return <PieChart2 />;
};

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center',
    // backgroundColor: 'grey',
  },
});
