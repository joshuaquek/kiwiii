
/** @module component/formBoxGroup */

import d3 from 'd3';

import {default as dropdown} from './dropdown.js';
import {default as box} from './formBox.js';
import {default as lbox} from './formListBox.js';
import {default as rbox} from './formRangeBox.js';


/**
 * Render color range control box group
 * @param {d3.selection} selection - selection of box container (div element)
 */
function colorRangeGroup(selection, colorScales) {
  selection
      .classed('mb-3', true);
  selection.append('div')
      .classed('colorscale', true)
      .classed('mb-2', true)
      .call(lbox.colorScaleBox, 'Colorscale')
      .call(lbox.colorScaleBoxItems, colorScales);

  // Custom colorscale
  const collapse = selection.append('div')
      .call(dropdown.dropdownFormGroup, 'Custom color')
    .select('.card-body')
      .classed('p-2', true);

  const customColorRanges = [
    {key: 'continuous', name: 'Continuous'},
    {key: 'two-piece', name: 'Two-piece'}
  ];
  collapse.append('div')
      .classed('rangetype', true)
      .classed('mb-1', true)
      .call(lbox.selectBox, 'Range type')
      .call(lbox.updateSelectBoxOptions, customColorRanges);
  collapse.append('div')
      .classed('range', true)
      .classed('mb-1', true)
      .call(rbox.colorRangeBox, 'Range');
  collapse.append('div')
      .classed('unknown', true)
      .classed('mb-1', true)
      .call(box.colorBox, 'Unknown');
}


function updateColorRangeGroup(selection, cscale, range, unknown) {
  const customRange = () => {
    const cs = lbox.colorScaleBoxValue(selection.select('.colorscale'));
    const rg = box.formValue(selection.select('.rangetype'));
    const customScale = cs === 'custom';
    selection.selectAll('.rangetype, .range, .unknown')
        .selectAll('select, input')
        .property('disabled', !customScale)
        .style('opacity',  customScale ? null : 0.3);
    selection.select('.range').select('.mid')
        .property('disabled', !customScale || rg === 'continuous')
        .style('opacity', customScale && rg !== 'continuous' ? null : 0.3);
  };
  selection.select('.colorscale')
      .call(lbox.updateColorScaleBox, cscale)
      .on('change', function () {
        customRange();
      });
  const rtype = range.length === 2 ? 'continuous' : 'two-piece';
  selection.select('.rangetype')
      .call(box.updateFormValue, rtype)
      .on('change', function () {
        customRange();
      })
      .dispatch('change');
  const rboxValues = range.length === 2  ? [range[0], null, range[1]] : range;
  selection.select('.range')
      .call(rbox.updateColorRangeBox, rboxValues)
      .on('focusin', () => {
        selection.dispatch('change', {bubbles: true});
      });
  selection.select('.unknown')
      .call(box.updateFormValue, unknown)
      .on('focusin', () => {
        selection.dispatch('change', {bubbles: true});
      });
}


function colorRangeGroupValue(selection) {
  const colorScale = lbox.colorScaleBoxItem(selection.select('.colorscale'));
  const rtype = box.formValue(selection.select('.rangetype'));
  const range = rbox.colorRangeBoxValues(selection.select('.range'));
  const unknown = box.formValue(selection.select('.unknown'));
  return {
    color: colorScale.key,
    colorScaleType: colorScale.type,
    range: rtype === 'continuous' ? [range[0], range[2]] : range,
    unknown: unknown
  };
}


/**
 * Render scale and domain control box group
 * @param {d3.selection} selection - selection of box container (div element)
 */
function scaleBoxGroup(selection) {
  const scaleOptions = [
    {key: 'linear', name: 'Linear'},
    {key: 'log', name: 'Log'}
  ];
  selection
      .classed('mb-3', true);
  selection.append('div')
      .classed('scale', true)
      .classed('mb-1', true)
      .call(lbox.selectBox, 'Scale')
      .call(lbox.updateSelectBoxOptions, scaleOptions);
  selection.append('div')
      .classed('domain', true)
      .classed('mb-1', true)
      .call(rbox.rangeBox, 'Domain');
}


function updateScaleBoxGroup(selection, scale, domain) {
  selection.select('.scale')
      .call(box.updateFormValue, scale);
  selection.select('.domain')
      .call(rbox.updateRangeBox, domain)
      .on('input', function () {
        scaleBoxGroupValid(selection);
      });
  selection.selectAll('.scale, .domain')
      .on('change', function () {
        if (!scaleBoxGroupValid(selection)) {
          d3.event.stopPropagation();
        }
      });
}


function scaleBoxGroupValid(selection) {
  if (!rbox.rangeBoxValid(selection.select('.domain'))) return false;
  if (box.formValue(selection.select('.scale')) === 'linear') return true;
  const values = rbox.rangeBoxValues(selection.select('.domain'));
  selection.select('.domain').select('.min')
      .style('background-color', values[0] > 0 ? '#ffffff' : '#ffcccc');
  selection.select('.domain').select('.max')
      .style('background-color', values[1] > 0 ? '#ffffff' : '#ffcccc');
  const validScale = box.formValue(selection.select('.scale')) !== '';
    selection.select('.scale').select('select')
        .style('background-color', validScale ? '#ffffff' : '#ffcccc');
  return values[0] > 0 && values[1] > 0 && validScale;
}


function scaleBoxGroupValue(selection) {
  const scale = box.formValue(selection.select('.scale'));
  const domain = rbox.rangeBoxValues(selection.select('.domain'));
  return {
    scale: scale || 'linear',
    domain: domain
  };
}


export default {
  colorRangeGroup, updateColorRangeGroup, colorRangeGroupValue,
  scaleBoxGroup, updateScaleBoxGroup, scaleBoxGroupValue, scaleBoxGroupValid
};
