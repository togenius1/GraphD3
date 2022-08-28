import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Svg, {Path, G, Text as SvgText, Polyline, Line} from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import {scaleLinear} from 'd3-scale';
import {max, min, extent, sum} from 'd3-array';

type Props = {};

const {width, height} = Dimensions.get('window');
const radius = width * 0.15;

const data = [
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
    .range(['#dff6a2', '#b90404']);

  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      // .padAngle(0.01)
      .innerRadius(0)
      .outerRadius(radius);

    const outerArcForLabelsPosition = d3Shape
      .arc()
      .innerRadius(radius * 0.95)
      .outerRadius(radius * 0.95);

    return {
      path: instance(arc),
      color: gradientScale(arc.value),
      value: data,
      centroid: instance.centroid(arc),
      radius: radius,
      startAngle: arc.startAngle,
      endAngle: arc.endAngle,
      outerArcForLabelsPosition: outerArcForLabelsPosition,
    };
  });
};

const PieChart2 = (props: Props) => {
  const [labelPos, setLabelPos] = useState([]);

  const _piePaths = makePie();
  // useEffect(() => {
  //   _piePaths;

  // }, []);

  const _renderSvgPie = () => {
    //
    return (
      <View style={styles.container}>
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${width}`}>
          <G y={width / 2} x={width / 2}>
            {_piePaths.map((arc, i) => {
              const [x, y] = arc.centroid;
              const number = arc.value[i].number;
              const label = arc.value[i].name;

              const posA = arc.outerArcForLabelsPosition.centroid(arc);
              const posB = arc.outerArcForLabelsPosition.centroid(arc);
              const posC = arc.outerArcForLabelsPosition.centroid(arc);
              const midAngle =
                arc.startAngle + (arc.endAngle - arc.startAngle) / 2;

              posB[0] = arc.radius * 0.65 * (midAngle < Math.PI ? 1 : -1);
              const cx = posC[0] * 2;
              const cy = posC[1] * 2;

              return (
                <G key={`arc-${i}`} onPress={() => alert(number)}>
                  <Path d={arc.path} fill={arc.color} />
                  <SvgText
                    x={x}
                    y={y}
                    fill="#1c1b1b"
                    textAnchor="middle"
                    fontSize={12}>
                    {number}
                  </SvgText>

                  <Polyline
                    points={`${posA} ${posB} ${cx},${cy}`}
                    // points={`${posB} ${cx},${cy}`}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth="1"
                  />
                </G>
              );
            })}
          </G>
        </Svg>
        {_piePaths.map((arc, i) => {
          const [x, y] = arc.centroid;
          const label = arc.value[i].name;
          const number = arc.value[i].number;
          const posA = arc.centroid;
          const posB = arc.outerArcForLabelsPosition.centroid(arc);
          const posC = arc.outerArcForLabelsPosition.centroid(arc);
          // const midAngle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;

          // posC[0] = arc.radius * 2.2 * (midAngle < Math.PI ? 1 : -1);

          const cx = posC[0] * 2.25;
          const cy = posC[1] * 2.25;

          return (
            <View
              key={`labelBox-${i}`}
              style={{
                width: 80,
                height: 35,
                // backgroundColor: '#d5d5d5',
                // opacity: 0.75,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                transform: [
                  {
                    translateX: cx,
                  },
                  {
                    translateY: cy,
                  },
                ],
              }}>
              <Text style={{fontSize: 12, color: '#000000'}}>{label}</Text>
              <Text style={{fontSize: 12, color: '#000000'}}>{number}</Text>
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
