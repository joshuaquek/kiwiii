
/** @module datagridApp */

import d3 from 'd3';

import {default as core} from './common/core.js';
import {default as fetcher} from './common/fetcher.js';
import {default as hfile} from './common/file.js';
import {default as idb} from './common/idb.js';
import {default as legacy} from './common/legacySchema.js';
import {default as mapper} from './common/mapper.js';
import {default as misc} from './common/misc.js';
import {default as sw} from './common/sw.js';

import {default as button} from './component/button.js';
import {default as modal} from './component/modal.js';

import {default as fieldConfigDialog} from './dialog/fieldConfig.js';
import {default as fieldFetchDialog} from './dialog/fieldFetch.js';
import {default as fieldFileDialog} from './dialog/fieldFile.js';
import {default as fieldInputDialog} from './dialog/fieldInput.js';
import {default as networkgenDialog} from './dialog/networkgen.js';
import {default as renameDialog} from './dialog/rename.js';

import DatagridState from './datagrid/state.js';
import {default as rowf} from './datagrid/rowFilter.js';
import {default as sort} from './datagrid/sort.js';
import {default as view} from './datagrid/view.js';


function app(data, serverStatus, schema) {
  const menubar = d3.select('#menubar');
  menubar.selectAll('div,span,a').remove();  // Clean up
  const dialogs = d3.select('#dialogs');
  dialogs.selectAll('div').remove();  // Clean up

  const state = new DatagridState(legacy.convertTable(data));
  state.serverStatus = serverStatus;
  state.resourceSchema = schema;

  // Datagrid view control
  const menu = menubar.append('div')
      .call(button.dropdownMenuButton, 'Datagrid', 'primary', 'table-white')
      .select('.dropdown-menu');
  menu.append('a').call(fieldConfigDialog.menuLink);
  menu.append('a')
      .classed('online-command', true)
      .call(fieldFetchDialog.menuLink);
  menu.append('a').call(fieldFileDialog.menuLink);
  menu.append('a').call(fieldInputDialog.menuLink);
  menu.append('a')
      .classed('online-command', true)
      .call(networkgenDialog.menuLink);
  menu.append('a').call(renameDialog.menuLink);
  menu.append('a')
      .call(button.dropdownMenuItem, 'Save', 'save')
      .on('click', function () {
        if (state.data.storeID) {
          return idb.updateItem(state.data.storeID, item => {
            item.id = misc.uuidv4();
            item.name = state.data.name;
            item.fields = state.data.fields;
            item.records = state.data.records;
          })
          .then(() => console.info('Datagrid saved'));
        } else {
          return idb.putItem(state.export())
            .then(storeID => {
              window.location = `datagrid.html?id=${storeID}`;
            });
        }
      });
  menu.append('a')
      .call(button.dropdownMenuItem, 'Download JSON', 'export')
      .on('click', () => {
        const data = state.export();
        // Delete local store information
        delete data.storeID;
        hfile.downloadJSON(data, data.name);
      });
  menu.append('a')
      .classed('online-command', true)
      .call(button.dropdownMenuItem, 'Download Excel', 'exportexcel')
      .on('click', () => {
        const data = state.export();
        const formData = new FormData();
        formData.append('contents', new Blob([JSON.stringify(data)]));
        return fetcher.post('xlsx', formData)
          .then(fetcher.blob)
          .then(blob => hfile.downloadDataFile(blob, `${data.name}.xlsx`));
      });
  // Open control panel
  menubar.append('a')
      .call(button.menuButtonLink, 'Dashboard', 'outline-secondary', 'db-gray')
      .attr('href', 'dashboard.html')
      .attr('target', '_blank');
  // Fetch control
  menubar.append('a')
      .classed('refresh', true)
      .call(button.menuButtonLink, 'Refresh', 'outline-secondary', 'refresh-gray')
      .on('click', function () {
        return core.fetchProgress(state.data.storeID)
          .then(() => idb.getItemByID(state.data.storeID))
          .then(item => {
            state.data = item;
            state.updateContentsNotifier();
            updateApp(state);
          });
      });
  menubar.append('a')
      .classed('abort', true)
      .call(button.menuButtonLink, 'Abort server job', 'warning', 'delete-gray')
      .attr('data-toggle', 'modal')
      .attr('data-target', '#abort-dialog');
  menubar.append('span').classed('progress', true)
    .append('progress')
      .attr('max', 100);
  menubar.append('span').classed('title', true);
  menubar.append('span').classed('status', true);

  // Dialogs
  dialogs.append('div')
      .classed('fieldconfd', true)
      .call(fieldConfigDialog.body);
  dialogs.append('div')
      .classed('fieldfetchd', true)
      .call(fieldFetchDialog.body, schema, state.fetchedAssays);
  dialogs.append('div')
      .classed('fieldfiled', true)
      .call(fieldFileDialog.body);
  dialogs.append('div')
      .classed('fieldinputd', true)
      .call(fieldInputDialog.body);
  dialogs.append('div')
      .classed('netgend', true)
      .call(networkgenDialog.body, serverStatus.rdkit);
  dialogs.append('div')
      .classed('renamed', true)
      .call(renameDialog.body, state.data.name);
  dialogs.append('div')
      .classed('abortd', true)
      .call(
        modal.confirmDialog, 'abort-dialog',
        'Are you sure you want to abort this calculation job?'
      );

  // Contents
  d3.select('#datagrid')
      .call(view.datagrid, state)
      .call(sort.setSort, state);
  d3.select('#dg-search')
      .call(rowf.setFilter, state);

  // Resize window
  d3.select('#datagrid').dispatch('resize');
  window.onresize = () => d3.select('#datagrid').dispatch('resize');

  updateApp(state);
}


function updateApp(state) {
  d3.select('#loading-icon').style('display', 'none');

  // Title
  d3.select('title').text(state.data.name);

  // Menubar
  const menubar = d3.select('#menubar');
  menubar.select('.title').text(state.data.name);
  menubar.select('.status')
      .text(`(${state.data.status} - ${state.data.records.length} records found in ${state.data.execTime} sec.)`);
  menubar.select('.progress').select('progress')
      .attr('value', state.data.progress)
      .text(`${state.data.progress}%`);

  // disable on-line commands
  if (!state.serverStatus.instance) {
    menubar.selectAll('.online-command')
      .attr('data-target', null)
      .classed('disabled', true)
      .on('click', null);
  }

  // hide fetch commands
  const ongoing = ['running', 'ready'].includes(state.data.status);
  menubar.selectAll('.progress, .refresh, .abort')
    .style('display', ongoing ? null : 'none');

  // Dialogs
  const dialogs = d3.select('#dialogs');
  dialogs.select('.fieldconfd')
      .call(fieldConfigDialog.updateBody, state)
      .on('submit', function () {
        state.data.fields = fieldConfigDialog.value(d3.select(this));
        state.updateContentsNotifier();
        updateApp(state);
      });
  dialogs.select('.fieldfetchd')
      .call(fieldFetchDialog.updateBody)
      .on('submit', function () {
        const targets = state.resourceSchema.resources
          .filter(e => e.domain === 'activity').map(e => e.id);
        const compounds = state.data.records.map(e => e.compound_id);
        const queries = fieldFetchDialog.queries(d3.select(this), targets, compounds);
        const futures = queries.map(q => {
          return fetcher.get(q.workflow, q)
            .then(fetcher.json)
            .then(data => {
              return mapper.tableToMapping(
                data, 'compound_id', ['index', 'assay_id']);
            });
        });
        Promise.all(futures).then(mps => {
          mps.forEach(mp => state.joinFields(mp));
          state.updateContentsNotifier();
          updateApp(state);
        });
      });
  dialogs.select('.fieldfiled')
      .on('submit', function () {
        return fieldFileDialog.readFile(d3.select(this))
          .then(data => {
            state.joinFields(data);
            state.updateContentsNotifier();
            updateApp(state);
          });
      });
  dialogs.select('.fieldinputd')
      .on('submit', function () {
        const value = fieldInputDialog.value(d3.select(this));
        const field = misc.defaultFieldProperties([value.field])[0];
        state.data.fields.push(field);
        state.data.records.forEach(e => {
          e[field.key] = value.default;
        });
        state.applyData();
        state.updateContentsNotifier();
        updateApp(state);
      });
  dialogs.select('.netgend')
      .on('submit', function () {
        const formData = new FormData();
        const params = networkgenDialog.queryParams(d3.select(this));
        formData.append('params', JSON.stringify(params));
        formData.append('contents', new Blob([JSON.stringify(state.export())]));
        return fetcher.post(`${params.measure}net`, formData)
          .then(fetcher.json)
          .then(data => {
            data.reference.nodes = state.data.storeID;
            data.fields = misc.defaultFieldProperties(data.fields);
            return data;
          })
          .then(idb.putItem)
          .then(storeID => {
            d3.select('#loading-icon').style('display', 'none');
            window.open(`network.html?id=${storeID}`, '_blank');
          });
      });
  dialogs.select('.renamed')
      .call(renameDialog.updateBody, state)
      .on('submit', function () {
        state.data.name = renameDialog.value(d3.select(this));
        updateApp(state);
  });
  dialogs.select('.abortd')
      .on('submit', function () {
        core.fetchProgress(state.data.storeID, 'abort')
          .then(() => idb.getItemByID(state.data.storeID))
          .then(item => {
            state.data = item;
            state.updateContentsNotifier();
            updateApp(state);
          });
      });
}


function run() {
  // TODO: offline mode flags
  const localFile = document.location.protocol !== "file:";  // TODO
  const offLine = 'onLine' in navigator && !navigator.onLine;  // TODO
  if (debug) {
    console.info('Off-line mode is disabled for debugging');
  } else {
    sw.registerServiceWorker();
  }
  return core.serverStatus()
    .then(response => {
      const storeID = misc.URLQuery().id || null;
      const dataURL = misc.URLQuery().location || null;
      if (storeID) {
        // Load from IndexedDB store
        core.fetchProgress(storeID, 'update')
          .then(() => idb.getItemByID(storeID))
          .then(item => app(item, response.server, response.schema));
      } else if (dataURL) {
        // Fetch via HTTP
        hfile.fetchJSON(dataURL)
          .then(item => app(item, response.server, response.schema));
      } else {
        d3.select('#datagrid')
          .style('color', 'red')
          .text('ERROR: invalid URL');
      }
    });
}


export default {
  run
};