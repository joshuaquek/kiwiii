
/** @module network/force */

import d3 from 'd3';

import {default as component} from './component.js';
import {default as interaction} from './interaction.js';


const forcePresets = {
  aggregate: d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.index).distance(60).strength(1))
    .force('charge',
      d3.forceManyBody().strength(-600).distanceMin(15).distanceMax(720))
    .force('collide', d3.forceCollide().radius(90))
    .force('x', d3.forceX().strength(0.002))
    .force('y', d3.forceY().strength(0.002)),
  tree: d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.index).distance(60).strength(2))
    .force('charge',
      d3.forceManyBody().strength(-6000).distanceMin(15).distanceMax(720))
    .force('collide', d3.forceCollide().radius(90))
    .force('x', d3.forceX().strength(0.0002))
    .force('y', d3.forceY().strength(0.0002))
};


function forceSimulation(preset, width, height) {
  return forcePresets[preset]
    .force('center', d3.forceCenter(width / 2, height / 2))
    .stop();
}


function forceDragListener(selection, simulation, state) {
  return d3.drag()
    .on('start', () => {
      if (!d3.event.active) selection.call(relax, simulation, state);
    })
    .on('drag', d => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    })
    .on('end', d => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}


function end(selection, simulation, state) {
  const coords = state.ns.map(e => ({x: e.x, y: e.y}));
  state.setAllCoords(coords);
  selection
    .call(component.updateComponents, state);
}


function stick(selection, simulation, state) {
  simulation.alpha(0).stop();
  selection.select('.nw-nodes').selectAll('.node')
    .each(d => {
      d.fx = d.x;
      d.fy = d.y;
    });
  state.dragListener = interaction.dragListener(selection, state);
  selection.call(end, simulation, state);
}


function unstick(selection, simulation, state) {
  selection.select('.nw-nodes').selectAll('.node')
    .each(d => {
      d.fx = null;
      d.fy = null;
    });
  state.dragListener = forceDragListener(selection, simulation, state);
  // Render all nodes and do not render edges
  // TODO: edge rendering behavior should be changed by data size or setting
  const coords = state.ns.map(e => ({x: e.x, y: e.y}));
  state.setAllCoords(coords);
  selection
    .call(component.updateComponents, state);
}


function relax(selection, simulation, state) {
  selection.call(unstick, simulation, state);
  simulation.alpha(0.1).restart();
}


function restart(selection, simulation, state) {
  selection.call(unstick, simulation, state);
  simulation.alpha(1).restart();
}


function setForce(selection, simulation, state) {
  simulation.nodes(state.ns)
    .force('link').links(state.currentEdges());
}


function activate(selection, simulation, state) {
  simulation
    .on('tick', () => {
      selection.select('.nw-nodes').selectAll(".node")
        .call(component.updateNodeCoords);
      const coords = state.ns.map(e => ({x: e.x, y: e.y}));
      state.setAllCoords(coords);
      selection.select('.nw-edges').selectAll(".link")
        .call(component.updateEdgeCoords);
      state.tickCallback(simulation);
    })
    .on('end', () => {
      selection.call(end, simulation, state);
      state.tickCallback(simulation);
    });
  state.setForceNotifier = () => {
    selection.call(setForce, simulation, state);
  };
  state.stickNotifier = () => {
    selection.call(stick, simulation, state);
  };
  state.relaxNotifier = () => {
    selection.call(relax, simulation, state);
  };
  state.restartNotifier = () => {
    selection.call(restart, simulation, state);
  };
  state.setForceNotifier();
  if (state.simulationOnLoad) {
    selection.call(restart, simulation, state);
  } else {
    selection.call(stick, simulation, state);
  }
}


export default {
  forceSimulation, activate, stick, relax, restart
};
