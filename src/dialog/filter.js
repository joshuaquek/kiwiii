
/** @module dialog/filter */

import _ from 'lodash';

import {default as fetcher} from '../common/fetcher.js';

import {default as button} from '../component/button.js';
import {default as box} from '../component/formBox.js';
import {default as lbox} from '../component/formListBox.js';
import {default as modal} from '../component/modal.js';


const id = 'filter-dialog';
const title = 'Search by properties';


function menuLink(selection) {
  selection.call(button.dropdownMenuModal, title, id, 'searchprop');
}


function body(selection, resources) {
  const dialog = selection.call(modal.submitDialog, id, title);
  const fields = _(resources.map(e => e.fields))
    .flatten()
    .uniqBy('key')
    .value()
    .filter(e => e.hasOwnProperty('d3_format')
                 || ['compound_id', 'numeric', 'text'].includes(e.format));
  dialog.select('.modal-body').append('div')
    .classed('key', true)
    .call(lbox.selectBox, 'Field', fields, null);
  dialog.select('.modal-body').append('div')
    .classed('operator', true)
    .call(lbox.selectBox, 'Operator',
          [
            {key: 'eq', name: '='},
            {key: 'gt', name: '>'},
            {key: 'lt', name: '<'},
            {key: 'ge', name: '>='},
            {key: 'le', name: '>='},
            {key: 'lk', name: 'LIKE'}
          ], 'eq');
  dialog.select('.modal-body').append('div')
    .classed('value', true)
    .call(box.textBox, 'Value', '');
  // Targets
  const res = resources.map(d => ({key: d.id, name: d.name}));
  dialog.select('.modal-body').append('div')
      .classed('target', true)
      .call(lbox.checklistBox, 'Target databases', res, null);
}


function execute(selection) {
  const query = {
    workflow: 'filter',
    targets: lbox.checklistBoxValue(selection.select('.target')),
    key: lbox.selectBoxValue(selection.select('.key')),
    value: box.textBoxValue(selection.select('.value')),
    operator: lbox.selectBoxValue(selection.select('.operator'))
  };
  return fetcher.get(query.workflow, query)
    .then(fetcher.json);
}


export default {
  menuLink, body, execute
};
