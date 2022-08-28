import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Svg, {Path, G, Text as SvgText, Polyline, Line} from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import {scaleLinear} from 'd3-scale';
import {max, min, extent, sum} from 'd3-array';

type Props = {};

const {width, height} = Dimensions.get('window');
const wheelSize = width * 0.3;

const data = [
  {number: 60, name: 'Locke'},
  {number: 80, name: 'Reyes'},
  {number: 90, name: 'Ford'},
  {number: 110, name: 'Jarrah'},
  {number: 160, name: 'Shephard'},
  {number: 220, name: 'Kwon'},
];

const makePie = () => {
  // const data = Array.from({length: numberOfSegments}).fill(1);
  const filteredData = data.map(data => data.number);
  const numberOfSegments = filteredData.length;

  const arcs = d3Shape.pie()(filteredData);

  // Scale linear color
  const maxValue = max(filteredData);
  const minValue = min(filteredData);
  const gradientScale = scaleLinear()
    .domain([minValue, maxValue])
    .range(['#a5ebab', '#b90404']);

  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      // .padAngle(0.01)
      .innerRadius(width / 2)
      .outerRadius(0);

    return {
      path: instance(arc),
      color: gradientScale(arc.value),
      value: data,
      centroid: instance.centroid(arc),
    };
  });
};

const PieChart2 = (props: Props) => {
  const _piePaths = makePie();
  // useEffect(() => {
  //   _piePaths;
  //   console.log(_piePaths);
  // }, []);

  const _renderSvgPie = () => {
    //
    return (
      <View style={styles.container}>
        <Svg
          width={wheelSize}
          height={wheelSize}
          viewBox={`0 0 ${width} ${width}`}>
          <G y={width / 2} x={width / 2}>
            {_piePaths.map((arc, i) => {
              const [x, y] = arc.centroid;
              const number = arc.value[i].number.toString();
              const label = arc.value[i].name;
              return (
                <G key={`arc-${i}`} onPress={() => alert(number)}>
                  <Path d={arc.path} fill={arc.color} />
                  <SvgText
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor="middle"
                    fontSize={26}>
                    {number}
                  </SvgText>
                  <Polyline
                    points={`${0},${0} ${x},${y}`}
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                  />
                </G>
              );
            })}
          </G>
        </Svg>
        {_piePaths.map((arc, i) => {
          const [x, y] = arc.centroid;
          const label = arc.value[i].name;
          const number = arc.value[i].number; // console.log(y);

          return (
            <View
              style={{
                width: 80,
                height: 35,
                backgroundColor: '#fcacac',
                opacity: 0.75,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                transform: [
                  {
                    translateX: x * 1.25,
                  },
                  {
                    translateY: y * 1.25,
                  },
                ],
              }}>
              <Text style={{fontSize: 12, color: 'blue'}}>{label}</Text>
              <Text style={{fontSize: 12, color: 'blue'}}>{number}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return <>{_renderSvgPie()}</>;
};

export default PieChart2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
