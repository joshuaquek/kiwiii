
/** @module datagrid/component */

import d3 from 'd3';


function updateHeader(selection, state) {
  const header = selection.select('.dg-header');
  header.selectAll('.dg-hcell').remove();
  header.selectAll('.dg-hcell').data(state.visibleFields)
    .enter().append('div')
      .classed('dg-hcell', true)
      .style('display', 'inline-block')
      .style('width', d => `${d.width}%`)
      .text(d => d.name);
  selection
      .style('width', '100%')
      .dispatch('resize');
  const vp = selection.select('.dg-viewport');
  const pos = Math.floor(vp.node().scrollTop / state.rowHeight);
  state.setScrollPosition(pos);
  selection.call(updateRows, state);
}


function updateRows(selection, state) {
  selection.select('.dg-body')
    .style('height', `${state.bodyHeight}px`);
  const rows = selection.select('.dg-body')
    .selectAll('.dg-row')
      .data(state.recordsToShow(), state.keyFunc);
  rows.exit().remove();
  rows.enter()
    .append('div')
      .attr('class', 'dg-row')
      .style('position', 'absolute')
      .style('width', '100%')
    .merge(rows)
      .style('height', `${state.rowHeight}px`)
      .each(function (d, i) {
        const rowIndex = state.viewportTop + i;
        const rowPos = rowIndex * state.rowHeight;
        d3.select(this)
          .style('transform', `translate(0px, ${rowPos}px)`)
          .classed('odd', (rowIndex) % 2 === 0);
        d3.select(this).selectAll('.dg-cell').remove();
        d3.select(this).call(state.rowFactory(), d, rowIndex);
      });
}


function resizeViewport(selection, state) {
  selection.select('.dg-viewport').style('height', `${state.viewportHeight}px`);
}


export default {
  updateHeader, updateRows, resizeViewport
};
