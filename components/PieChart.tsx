import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Path, Circle, Text as SvgText, G} from 'react-native-svg';
import * as shape from 'd3-shape';

type Props = {};

type PieCircleProps = {
  slices: Slice[];
};

type Slice = {
  percentage: number;
  color: string;
};

const PieChart = ({}: Props) => {
  let totalPercentage = 0;
  let slices = [];

  //option 1  Equal size pieces
  slices.push({key: 'legs', percentage: 0.25, color: 'blue'});
  slices.push({key: 'chest', percentage: 0.15, color: 'red'});
  slices.push({key: 'foot', percentage: 0.28, color: 'green'});
  slices.push({key: 'finger', percentage: 0.32, color: 'yellow'});

  // GET Coordinate
  const getCoordinatesForPercent = () => {
    const x = Math.cos(2 * Math.PI * totalPercentage);
    const y = Math.sin(2 * Math.PI * totalPercentage);
    return [x, y];
  };

  // SLICE
  function _renderSlice({percentage, color}: Slice) {
    const [startX, startY] = getCoordinatesForPercent();
    totalPercentage += percentage;
    const [endX, endY] = getCoordinatesForPercent();

    const largeArcFlag = percentage > 0.5 ? 1 : 0;
    const pathData = [
      `M ${startX} ${startY}`, // Move
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
      'L 0 0', // Line
    ].join(' ');

    return (
      <G key={pathData}>
        <Path d={pathData} fill={color} key={pathData} />
        <SvgText
          x={startX}
          y={startY}
          stroke="#600"
          fill="#600"
          textAnchor="start">
          TEXT
        </SvgText>
      </G>
    );
  }

  return (
    <View style={styles.container}>
      <Svg
        height="100"
        width="100"
        viewBox="-1 -1 2 2"
        style={{transform: [{rotate: '-90deg'}]}}>
        {slices.map(slice => _renderSlice(slice))}
      </Svg>
    </View>
  );
};

export default PieChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#ffe2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
