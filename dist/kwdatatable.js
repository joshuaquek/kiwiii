// https://github.com/mojaie/kiwiii Version 0.8.1. Copyright 2017 Seiji Matsuoka.
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("d3"),require("pako"),require("Dexie"),require("vega")):"function"==typeof define&&define.amd?define(["d3","pako","Dexie","vega"],t):e.kwdatatable=t(e.d3,e.pako,e.Dexie,e.vega)}(this,function(e,t,n,r){"use strict";function s(e){const t=e.columns.map(e=>(e.format="raw",e));return{id:e.id,name:e.name,dataType:x[e.format],schemaVersion:.8,revision:0,status:k[e.status],fields:t,records:e.records,query:e.query,taskCount:e.searchCount,doneCount:e.searchDoneCount|e.searchCount,resultCount:e.recordCount,progress:100|e.progress,execTime:e.execTime,created:e.startDate|e.responseDate}}function o(e){if(e.hasOwnProperty("edges")){const t=s(e.nodes);return{nodes:t,edges:function(e,t){const n={fieldTransform:e.snapshot.fieldTransform,nodePositions:e.snapshot.nodePositions,nodeColor:{},nodeSize:{},nodeLabel:{},edge:{}};return e.snapshot.hasOwnProperty("nodeColor")?(n.nodeColor.id=e.snapshot.nodeColor.id,n.nodeColor.scale=e.snapshot.nodeColor.scale,n.nodeColor.field=t.find(t=>t.key===e.snapshot.nodeColor.column)):n.nodeColor={id:"color",field:t[0],scale:{scale:"linear",domain:[0,1],range:["black","white"],unknown:"gray"}},e.snapshot.hasOwnProperty("nodeSize")?(n.nodeSize.id=e.snapshot.nodeSize.id,n.nodeSize.scale=e.snapshot.nodeSize.scale,n.nodeSize.field=t.find(t=>t.key===e.snapshot.nodeSize.column)):n.nodeSize={id:"size",field:t[0],scale:{scale:"linear",domain:[0,1],range:[20,20],unknown:20}},e.snapshot.hasOwnProperty("nodeLabel")?(n.nodeLabel.id=e.snapshot.nodeLabel.id,n.nodeLabel.size=e.snapshot.nodeLabel.size,n.nodeLabel.text=e.snapshot.nodeLabel.text,n.nodeLabel.visible=e.snapshot.nodeLabel.visible,n.nodeLabel.scale=e.snapshot.nodeLabel.scale,n.nodeLabel.field=t.find(t=>t.key===e.snapshot.nodeLabel.column)):n.nodeLabel={id:"label",size:12,text:"_index",visible:!1,field:t[0],scale:{scale:"linear",domain:[0,1],range:["black","white"],unknown:"gray"}},e.snapshot.hasOwnProperty("nodeContent")?n.nodeContent=e.snapshot.nodeContent:n.nodeContent={structure:{visible:!1}},e.snapshot.hasOwnProperty("edge")?n.edge=e.snapshot.edge:n.edge={id:"label",label:{size:10,visible:!1},visible:!0,scale:{scale:"linear",domain:[0,1],range:[5,5],unknown:5}},{id:e.id,name:e.name,dataType:x[e.format],schemaVersion:.8,revision:0,reference:{nodes:e.nodeTableId},status:k[e.status],fields:v.defaultFieldProperties([{key:"source"},{key:"target"},{key:"weight"}]),records:e.records,query:e.query,networkThreshold:e.networkThreshold,taskCount:e.searchCount,doneCount:e.searchDoneCount|e.searchCount,resultCount:e.recordCount,progress:100|e.progress,execTime:e.execTime,created:e.startDate|e.responseDate,snapshot:n}}(e.edges,t.fields)}}return s(e)}function l(e,t,n){return new Promise((r,s)=>{const o=new FileReader,l=t?e.slice(0,t):e;o.onload=(e=>r(e.target.result)),o.onerror=(e=>s(e)),n?o.readAsArrayBuffer(l):o.readAsText(l)})}function a(e,n){const r=n?t.inflate(e,{to:"string"}):e,s=JSON.parse(r);return s.hasOwnProperty("schemaVersion")?s:s.hasOwnProperty("edges")&&s.edges.hasOwnProperty("schemaVersion")?s:o(s)}function i(e,t){try{const n=window.URL.createObjectURL(new Blob([e])),r=document.createElement("a");r.download=t,r.href=n,r.dispatchEvent(new MouseEvent("click",{view:window,bubbles:!0,cancelable:!1}))}catch(e){}}function c(e){const t={};return Object.entries(e.mapping).forEach(e=>{t[e[0]]=[e[1]]}),{created:e.created,fields:[e.field],key:e.key,mapping:t}}function d(e,t,n){return F.updateItem(e,e=>{e[t]=n,e.revision++}).catch(r=>{console.error(`Unexpected table ID: ${e}, key: ${t} or value: ${n}`),Promise.reject(r)})}function u(e,t){const n=parseFloat(e),r=parseFloat(t);return isNaN(n)||isNaN(r)?String(t).localeCompare(String(e)):r-n}function p(e,t){return String(t).localeCompare(String(e))}function m(t,n,r){const s=t.select("thead tr").selectAll("th").data(),o=t.select("tbody").selectAll("tr").data(n,r);o.exit().remove();const l=o.enter().append("tr");l.selectAll("td").data(e=>s.map(t=>e[t.key])).enter().append("td"),l.merge(o).selectAll("td").classed("align-middle",!0).html(function(e,t){if(void 0===e)return"";if("d3_format"===s[t].format)return C.formatNum(e,s[t].d3_format);if("plot"===s[t].format)return"[plot]";if("image"===s[t].format)return"[image]";if("control"!==s[t].format)return e}).each((t,n,r)=>{"control"===s[n].format&&e.select(r[n]).call(t)})}function f(){"serviceWorker"in navigator?navigator.serviceWorker.register("sw.js").then(e=>{console.info("ServiceWorker registration successful with scope: ",e.scope)}).catch(e=>{console.info("ServiceWorker registration failed: ",e)}):console.info("Off-line mode is not supported")}function h(t,n,r){const s=t.select(".dg-header").datum(),o=n.length*s.height;let l,a;t.select(".dg-body").style("height",`${o}px`).style("position","relative"),t.select(".dg-viewport").style("overflow-y","auto").on("scroll",function(){const o=e.select(this).node().scrollTop,i=Math.min(Math.floor(o/s.height),n.length);i!==l&&function(t,n,r,s,o){const l=t.select(".dg-header").datum(),a=t.select(".dg-header").selectAll(".dg-hcell").data(),i=Math.min(s,Math.max(0,n.length-o+1)),c=i+o,d=n.slice(i,Math.min(c,n.length)),u=t.select(".dg-body").selectAll(".dg-row").data(d,r).style("height",`${l.height}px`);u.exit().remove();const p=u.enter().append("div").attr("class","dg-row").style("position","absolute");p.selectAll(".dg-cell").data(a.map(e=>e.width)).enter().append("div").classed("dg-cell",!0).classed("align-middle",!0).style("display","inline-block").style("width",e=>`${e}px`),p.merge(u).order().each(function(t,n){const r=(s+n)*l.height;e.select(this).style("transform",`translate(0px, ${r}px)`).classed("odd",(s+n)%2==0).selectAll(".dg-cell").html(function(r,s){e.select(this).attr("id",`c${n}-${s}`);const o=t[a[s].key];return void 0===o?"":"d3_format"===a[s].format?C.formatNum(o,a[s].d3_format):"plot"===a[s].format?"":"compound_id"===a[s].format?`<a href="profile.html?compound=${o}" target="_blank">${o}</a>`:"image"===a[s].format?`<img src="${o}" width="180" height="180"/>`:o}).each(function(e,r){if("plot"!==a[r].format)return;if(!t.hasOwnProperty(a[r].key))return;const s=t[a[r].key];R.showPlot(s,`#c${n}-${r}`)})})}(t,n,r,l=i,a)}),e.select(window).on("resize",function(){const e=t.select(".dg-viewport"),n=e.node().getBoundingClientRect().top,r=window.innerHeight-n-5;e.style("height",`${r}px`);const o=Math.ceil(r/s.height)+1;o!==a&&(a=o,e.dispatch("scroll"))}).dispatch("resize")}function g(){return L.getTable(P.URLQuery().id).then(t=>{z.columnDialog(t.fields,g),z.fieldFileDialog(e=>L.joinFields(P.URLQuery().id,e).then(g)),_.renderStatus(t,()=>N.fetchResults().then(g),()=>N.fetchResults("abort").then(g)),e.select("#rename").on("click",()=>{e.select("#prompt-title").text("Rename table"),e.select("#prompt-label").text("New name"),e.select("#prompt-input").attr("value",t.name),e.select("#prompt-submit").on("click",()=>{const e=b.value("#prompt-input");return L.updateTableAttribute(t.id,"name",e).then(()=>L.getTable(P.URLQuery().id)).then(e=>_.renderStatus(e,()=>N.fetchResults().then(g),()=>N.fetchResults("abort").then(g)))})}),e.select("#datatable").call(B.createDataGrid,t).call(B.dataGridRecords,t.records,e=>e._index).call(B.addSort,t.records,e=>e._index),L.getResources().then(e=>{const n=e.filter(e=>"activity"===e.domain),r=t.records.map(e=>e.id);z.fieldFetchDialog(r,t.fields,n,e=>L.joinFields(P.URLQuery().id,e).then(g))}),z.graphDialog(n=>{const r=new FormData;return r.append("contents",new Blob([JSON.stringify(t)])),r.append("params",JSON.stringify(n)),S.post("simnet",r).then(S.json).then(t=>(t.networkThreshold=t.query.threshold,N.interactiveInsert(t).then(t=>{e.select("#loading-circle").style("display","none"),window.open(`graph.html?id=${t}`,"_blank")})),S.error)}),e.select("#export").on("click",()=>w.downloadJSON(t,t.name,!0)),e.select("#excel").on("click",()=>{const e=new FormData;return e.append("contents",new Blob([JSON.stringify(t)])),S.post("xlsx",e).then(S.blob).then(e=>w.downloadDataFile(e,`${t.name}.xlsx`),S.error)}),e.select("#sdfile").on("click",()=>{const e=new FormData;return e.append("contents",new Blob([JSON.stringify(t)])),S.post("sdfout",e).then(S.text).then(e=>w.downloadDataFile(e,`${t.name}.sdf`),S.error)})})}function y(e){return N.interactiveInsert(e).then(e=>{window.location=`datatable.html?id=${e}`})}e=e&&e.hasOwnProperty("default")?e.default:e,t=t&&t.hasOwnProperty("default")?t.default:t,n=n&&n.hasOwnProperty("default")?n.default:n,r=r&&r.hasOwnProperty("default")?r.default:r;var b={value:function(t){return e.select(t).node().value},valueInt:function(t){return parseInt(e.select(t).node().value)},valueFloat:function(t){return parseFloat(e.select(t).node().value)},checked:function(t){return e.select(t).node().checked},firstFile:function(t){return e.select(t).node().files[0]},inputValues:function(t){return e.selectAll(t).selectAll("input").nodes().map(e=>e.value)},checkboxValues:function(t){return e.selectAll(t).selectAll("input:checked").nodes().map(e=>e.value)},optionValues:function(t){return e.selectAll(t).selectAll("select").nodes().map(e=>e.value)},textareaLines:function(t){return e.select(t).node().value.split("\n").filter(e=>e.length>0)},optionData:function(t){const n=e.select(t).property("selectedIndex");return e.select(t).selectAll("option").data().find((e,t)=>t===n)},checkboxData:function(t){return e.selectAll(t).selectAll("input:checked").data()}},v={defaultFieldProperties:function(e){return e.map(e=>(e.hasOwnProperty("name")||(e.name=e.key),e.hasOwnProperty("visible")||(e.visible=!0),e.hasOwnProperty("d3_format")&&(e.format="d3_format"),e.hasOwnProperty("format")||(e.format="raw"),e))},sortType:function(e){return"d3_format"===e?"numeric":"numeric"===e?"numeric":"text"===e?"text":"none"},ongoing:function(e){return["running","ready"].includes(e.status)}};const k={Queued:"ready","In progress":"running",Aborting:"running",Aborted:"aborted",Completed:"done",Failure:"failure"},x={datatable:"nodes",connection:"edges"};var w={readFile:l,parseJSON:a,loadJSON:function(e){const t=e.name.endsWith("c")||e.name.endsWith(".gz");return l(e,!1,t).then(e=>a(e,t))},fetchJSON:function(e){const t=decodeURIComponent(e),n=t.endsWith("c")||t.endsWith(".gz");return fetch(t).then(e=>n?e.arrayBuffer():e.json()).then(e=>a(e,n))},downloadDataFile:i,downloadJSON:function(e,n,r=!0){const s=JSON.stringify(e),o=r?t.gzip(s):s,l=r?"c":"r";i(o,`${n}${e.hasOwnProperty("edges")?`.gf${l}`:`.nd${l}`}`)}};class A extends Array{unique(e){return this.reduce((t,n)=>(void 0===t.find(t=>t[e]===n[e])&&t.push(n),t),new A)}extend(){return this.reduce((e,t)=>(Array.prototype.push.apply(e,t),e),new A)}extendAsync(){return Promise.all(this).then(e=>e.reduce((e,t)=>(Array.prototype.push.apply(e,t),e),new A))}toArray(){return new Array(this)}toObject(){const e={};return this.forEach(t=>{e[t[0]]=t[1]}),e}}var P={URLQuery:function(){return A.from(window.location.search.substring(1).split("&")).map(e=>e.split("=")).toObject()}};const T="";var S={get:function(e,t={}){const n=Object.keys(t).length?`?query=${JSON.stringify(t)}`:"";return fetch(`${T}${e}${n}`,{credentials:"include"}).then(e=>200!==e.status?Promise.reject(new Error(e.statusText)):Promise.resolve(e))},json:function(e){return e.json()},text:function(e){return e.text()},blob:function(e){return e.blob()},post:function(e,t){return fetch(`${T}${e}`,{method:"POST",body:t,credentials:"include"}).then(e=>200!==e.status?Promise.reject(new Error(e.statusText)):Promise.resolve(e))},error:function(e){return console.error(e),null}},D={getSDFPropList:function(e){const t=/>.*?<(\S+)>/g,n=new Set;let r;for(;null!==(r=t.exec(e));)n.add(r[1]);return Array.from(n)},uuidv4:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})}},O={singleToMulti:c,mappingToTable:function(e){const t=e.hasOwnProperty("field")?c(e):e,n={key:t.key,format:"text"};return{fields:v.defaultFieldProperties([n].concat(t.fields)),records:Object.entries(t.mapping).map(e=>{const n={};return n[t.key]=e[0],t.fields.forEach((t,r)=>{n[t.key]=e[1][r]}),n})}},tableToMapping:function(e,t,n=["_index"]){const r={created:(new Date).toString(),fields:v.defaultFieldProperties(e.fields.filter(e=>e.key!==t).filter(e=>!n.includes(e.key))),key:t,mapping:{}};return e.records.forEach(e=>{r.mapping[e[t]]=r.fields.map(t=>e[t.key])}),r},csvToMapping:function(e){const t=e.split(/\n|\r|\r\n/),n=t.shift().split(","),r=n.shift(),s=new Date,o=[],l=[];n.forEach((e,t)=>{""!==e&&(o.push(t),l.push({key:e,format:"text"}))});const a={created:s.toString(),fields:v.defaultFieldProperties(l),key:r,mapping:{}};return t.forEach(e=>{const t=e.split(","),n=t.shift();a.mapping[n]=Array(o.length),o.forEach(e=>{a.mapping[n][e]=t[e]})}),a},apply:function(e,t){const n=t.hasOwnProperty("field")?c(t):t;e.records.filter(e=>n.mapping.hasOwnProperty(e[n.key])).forEach(e=>{n.fields.forEach((t,r)=>{e[t.key]=n.mapping[e[n.key]][r]})}),e.fields=v.defaultFieldProperties(A.from(e.fields).concat(n.fields).unique("key"))}};const I={app:"key",items:"id, dataType, created",resources:"id"};let j=new n("Store");j.version(1).stores(I);var F={getAppSetting:function(e){return j.app.where("key").equals(e).first().then(e=>{if(void 0!==e)return e.value})},putAppSetting:function(e,t){return j.app.put({key:e,value:t})},getResources:function(){return j.resources.toArray()},putResources:function(e){return j.resources.bulkPut(e)},getAllItems:function(){return j.items.orderBy("created").reverse().toArray()},getItemsByDataType:function(e){return j.items.where("dataType").equals(e).reverse().sortBy("created")},getItemById:function(e){return j.items.where("id").equals(e).first()},updateItem:function(e,t){return j.items.where("id").equals(e).modify(t)},deleteItem:function(e){return j.items.where("id").equals(e).delete()},putItem:function(e){return j.items.put(e)},reset:function(){return j.delete().then(()=>{(j=new n("Store")).version(1).stores(I)})}},L={getAppSetting:function(e){return F.getAppSetting(e).catch(t=>{console.error(`Unexpected key: ${e}`),Promise.reject(t)})},setAppSetting:function(e,t){return F.putAppSetting(e,t).catch(n=>{console.error(`Unexpected key: ${e} or value: ${t}`),Promise.reject(n)})},getResources:function(){return F.getResources()},setResources:function(e){return F.putResources(e).catch(t=>{console.error(`Unexpected resources: ${e}`),Promise.reject(t)})},getAllTables:function(){return F.getAllItems()},getTablesByDataType:function(e){return F.getItemsByDataType(e).catch(t=>{console.error(`Unexpected dataType: ${e}`),Promise.reject(t)})},getTable:function(e){return F.getItemById(e).catch(t=>{console.error(`Unexpected table ID: ${e}`),Promise.reject(t)})},setFieldProperties:function(e,t){return F.updateItem(e,e=>{e.fields.forEach((e,n)=>{e.visible=t.visibles.includes(e.key),e.format=t.formats[n],t.d3_formats[n]&&(e.d3_format=t.d3_formats[n])}),e.revision++}).catch(n=>{console.error(`Unexpected table ID: ${e} or updates: ${t}`),Promise.reject(n)})},joinFields:function(e,t){return F.updateItem(e,e=>{O.apply(e,t),e.revision++}).catch(n=>{console.error(`Unexpected table ID: ${e} or mapping: ${t}`),Promise.reject(n)})},updateTableAttribute:d,insertTable:function(e){return e.fields=v.defaultFieldProperties(e.fields),F.putItem(e).catch(t=>{console.error(`Unexpected data: ${e}`),Promise.reject(t)})},updateTable:function(e){return"failure"===e.status?d(e.id,"status","failure"):F.updateItem(e.id,t=>{e.fields=v.defaultFieldProperties(e.fields),Object.assign(t,e),t.revision++})},deleteTable:function(e){return F.deleteItem(e).catch(t=>{console.error(`Unexpected table ID: ${e}`),Promise.reject(t)})},reset:function(){return F.reset()}},C={formatNum:function(t,n){return void 0===t||null===t||Number.isNaN(t)?"":t==parseFloat(t)?e.format(n)(t):t},partialMatch:function(e,t){return void 0!==t&&null!==t&&""!==t&&-1!==t.toString().toUpperCase().indexOf(e.toString().toUpperCase())},numericAsc:u,numericDesc:function(e,t){return u(t,e)},textAsc:p,textDesc:function(e,t){return p(t,e)}},R={showPlot:function(e,t){new r.View(r.parse(e)).initialize(t).run()},plotThumbnail:function(e){return new r.View(r.parse(e)).toImageURL("png")}},q={selectOptions:function(e,t,n,r){const s=e.selectAll("option").data(t,n);s.exit().remove(),s.enter().append("option").merge(s).attr("value",n).text(r)},checkboxList:function(e,t,n,r,s){const o=e.selectAll("li").data(t,r);o.exit().remove();const l=o.enter().append("li").attr("class","form-check").append("label");l.append("input"),l.append("span");const a=l.merge(o.select("label")).attr("class","form-check-label");a.select("input").attr("type","checkbox").attr("class","form-check-input").attr("name",n).attr("value",r),a.select("span").text(s)},checkboxListT:function(e,t,n,r,s){const o=e.selectAll("li").data(t,r);o.exit().remove();const l=o.enter().append("li").attr("class","form-check").append("label");l.append("input"),l.append("a");const a=l.merge(o.select("label")).attr("class","form-check-label");a.select("input").attr("type","checkbox").attr("class","form-check-input").attr("name",n).attr("value",r),a.select("a").attr("data-toggle","tooltip").attr("data-placement","bottom").attr("title",e=>e.description||"No").text(s)},createTable:function(e,t){e.select("thead").size()&&e.select("thead").remove(),e.append("thead").append("tr"),e.select("tbody").size()&&e.select("tbody").remove(),e.append("tbody");const n=t.fields.filter(e=>e.visible),r=e.select("thead tr").selectAll("th").data(n,e=>e.key);r.exit().remove(),r.enter().append("th").merge(r).text(e=>e.name)},updateTableRecords:m,appendTableRows:function(e,t,n){const r=e.select("tbody").selectAll("tr").data();Array.prototype.push.apply(r,t),m(e,r,n)},addSort:function(t){t.select("thead tr").selectAll("th").filter(e=>"none"!==v.sortType(e.format)).append("span").append("a").attr("id",e=>`sort-${e.key}`).text("^v").style("display","inline-block").style("width","30px").style("text-align","center").on("click",n=>{const r="v"===e.select(`#sort-${n.key}`).text(),s="numeric"===v.sortType(n.format),o=r?s?C.numericAsc:C.textAsc:s?C.numericDesc:C.textDesc;t.select("tbody").selectAll("tr").sort((e,t)=>o(e[n.key],t[n.key])),e.select(`#sort-${n.key}`).text(r?"^":"v")})},formatNumbers:function(e){e.select("thead tr").selectAll("th").each((t,n)=>{"raw"!==t.digit&&e.select("tbody").selectAll("tr").selectAll("td").filter((e,t)=>t===n).text(e=>C.formatNum(e,t.digit))})}},z={pickDialog:function(t,n){L.getAppSetting("compoundIDPlaceholder").then(t=>{e.select("#pick-queryarea").text(t)}),e.select("#pick-submit").on("click",()=>{e.select("#loading-circle").style("display","inline");const r={type:"chemsearch",targets:t.filter(e=>"chemical"===e.domain).map(e=>e.id),key:"compound_id",values:b.textareaLines("#pick-queryarea")};return S.get("run",r).then(S.json).then(n,S.error)})},propDialog:function(t,n){e.select("#prop-targets").call(q.checkboxList,t,"targets",e=>e.id,e=>e.name).on("change",function(){const t=A.from(b.checkboxData("#prop-targets")).map(e=>e.fields).extend().unique("key");e.select("#prop-key").call(q.selectOptions,t,e=>e.key,e=>e.name)}),e.select("#prop-submit").on("click",()=>{e.select("#loading-circle").style("display","inline");const t={type:"chemprop",targets:b.checkboxValues("#prop-targets"),key:b.optionData("#prop-key").key,values:b.textareaLines("#prop-queryarea"),operator:b.value("#prop-operator")};return S.get("async",t).then(S.json).then(n,S.error)})},structDialog:function(t,n){e.select("#struct-qsrc").call(q.selectOptions,t,e=>e.id,e=>e.name),e.select("#struct-targets").call(q.checkboxList,t,"targets",e=>e.id,e=>e.name),L.getAppSetting("rdkit").then(t=>{e.select("#struct-method").selectAll("option.rd").attr("disabled",t?null:"disabled")}),e.selectAll("#struct-method,#struct-thldtype").on("change",function(){const t=b.value("#struct-method"),n=b.value("#struct-thldtype");e.select("#struct-thld").attr("disabled",["gls","rdmorgan","rdfmcs"].includes(t)?null:"disabled").attr("value","edge"===n?15:.7).attr("min","edge"===n?5:0).attr("max","edge"===n?999:1).attr("step","edge"===n?1:.01),e.select("#struct-thldtype").attr("disabled",["gls","rdmorgan","rdfmcs"].includes(t)?null:"disabled").property("value",["gls","rdfmcs"].includes(t)?void 0:"sim"),e.select("#struct-thldtype option.sim").attr("disabled",["gls","rdmorgan","rdfmcs"].includes(t)?null:"disabled"),e.select("#struct-thldtype option.edge").attr("disabled",["gls","rdfmcs"].includes(t)?null:"disabled"),e.select("#struct-options").selectAll(".gls").attr("disabled","gls"===t?null:"disabled"),e.select("#struct-options .fmcs").attr("disabled","rdfmcs"===t?null:"disabled")}).dispatch("change"),e.select("#struct-format").on("change",function(){e.select("#struct-qsrc").attr("disabled","dbid"===this.value?null:"disabled")}),e.select("#struct-preview").on("click",()=>{const t=b.value("#struct-format"),n={format:t,source:"dbid"===t?b.value("#struct-qsrc"):null,value:"molfile"===t?b.value("#struct-queryarea"):b.textareaLines("#struct-queryarea")[0]};return S.get("strprev",n).then(S.text).then(t=>e.select("#struct-image").html(t),S.error)}),e.select("#struct-submit").on("click",()=>{const t=b.value("#struct-method");e.select("#loading-circle").style("display","inline");const r=b.value("#struct-format"),s={type:b.value("#struct-method"),targets:b.checkboxValues("#struct-targets"),queryMol:{format:r,source:"dbid"===r?b.value("#struct-qsrc"):null,value:"molfile"===r?b.value("#struct-queryarea"):b.textareaLines("#struct-queryarea")[0]},params:{measure:b.value("#struct-thldtype"),threshold:b.valueFloat("#struct-thld"),ignoreHs:b.checked("#struct-ignoreh"),diameter:"gls"===t?b.valueInt("#struct-diam"):null,maxTreeSize:"gls"===t?b.valueInt("#struct-tree"):null,molSizeCutoff:"gls"===t?b.valueInt("#struct-skip"):null,timeout:"rdfmcs"===t?b.valueInt("#struct-timeout"):null}},o="exact"===s.type?"run":"async";return S.get(o,s).then(S.json).then(n,S.error)})},sdfDialog:function(t){e.select("#sdf-file").on("change",()=>{const t=new FileReader,n=document.getElementById("sdf-file").files[0];t.onload=(t=>{e.select("#sdf-cols").call(q.checkboxList,D.getSDFPropList(t.target.result),"fields",e=>e,e=>e)}),t.readAsText(n.slice(0,104857600))}),e.select("#sdf-selectall").on("change",()=>{e.select("#sdf-cols").selectAll("input").property("checked",b.checked("#sdf-selectall"))}),e.select("#sdf-submit").on("click",()=>{e.select("#loading-circle").style("display","inline");const n={fields:b.checkboxValues("#sdf-cols"),implh:b.checked("#sdf-implh"),recalc:b.checked("#sdf-recalc")},r=new FormData;return r.append("contents",b.firstFile("#sdf-file")),r.append("params",JSON.stringify(n)),S.post("sdfin",r).then(S.json).then(t,S.error)})},columnDialog:function(t,n){const r={fields:v.defaultFieldProperties([{key:"name",format:"text"},{key:"visible",format:"control"},{key:"format",format:"control"},{key:"d3_format",format:"control"}])},s=t.map(t=>{const n={},r=["text","numeric","d3_format"];return n.name=t.name,n.visible=(e=>e.classed("column-vis",!0).classed(`row-${t.key}`,!0).append("input").attr("type","checkbox").attr("value",t.key).property("checked",t.visible)),n.format=(n=>n.classed("column-format",!0).classed(`row-${t.key}`,!0).append("select").call(q.selectOptions,r.includes(t.format)?r:[t.format],e=>e,e=>e).property("value",t.format).attr("disabled",r.includes(t.format)?null:"disabled").on("change",function(){e.select(`.column-d3f.row-${t.key} input`).attr("disabled","d3_format"===this.value?null:"disabled")})),n.d3_format=(e=>e.classed("column-d3f",!0).classed(`row-${t.key}`,!0).append("input").property("value",t.d3_format).attr("disabled","d3_format"===t.format?null:"disabled")),n});e.select("#column-table").call(q.createTable,r).call(q.updateTableRecords,s,e=>e.key),e.select("#column-submit").on("click",()=>{const e={visibles:b.checkboxValues(".column-vis"),formats:b.optionValues(".column-format"),d3_formats:b.inputValues(".column-d3f")};return L.setFieldProperties(P.URLQuery().id,e).then(n)})},fieldFetchDialog:function(t,n,r,s){document.getElementById("join-search").addEventListener("keypress",e=>{13===e.keyCode&&e.preventDefault()});const o=n.map(e=>e.key),l=A.from(r.map(e=>e.fields)).extend().unique("key").filter(e=>"id"!==e.key);e.select("#join-keys").call(q.checkboxList,l,"keys",e=>e.key,e=>e.name).selectAll("li").each(function(t){e.select(this).selectAll("label").select("input").property("checked",o.includes(t.key)).attr("disabled",o.includes(t.key)?"disabled":null)}),e.select("#join-search").on("keyup",function(){const t=e=>C.partialMatch(b.value(this),e.name);e.select("#join-keys").selectAll("li").style("visibility",e=>t(e)?null:"hidden").style("position",e=>t(e)?null:"absolute")}),e.select("#join-submit").on("click",()=>{e.select("#loading-circle").style("display","inline");const n=b.checkboxValues("#join-keys"),r={type:"fieldfilter",targetFields:l.map(e=>e.key).filter(e=>!o.includes(e)).filter(e=>n.includes(e)),key:"compound_id",values:t};return S.get("run",r).then(S.json).then(e=>s(O.tableToMapping(e,"id")),S.error)})},fieldFileDialog:function(t){e.select("#importcol-file").on("change",()=>{const t=document.getElementById("importcol-file").files[0],n="csv"===t.name.split(".").pop();w.readFile(t).then(t=>{const r=n?O.csvToMapping(t):JSON.parse(t),s=O.mappingToTable(r);e.select("#importcol-preview").call(q.createTable,s).call(q.updateTableRecords,s.records.slice(0,5),e=>e[s.fields[0].key]),e.select("#importcol-preview").datum(r)})}),e.select("#importcol-submit").on("click",()=>{let n=e.select("#importcol-preview").datum();e.select("#importcol-preview").datum(null);const r=[];if(n.hasOwnProperty("field")&&(n=O.singleToMulti(n)),n.fields.forEach((e,t)=>{"plot"===e.format&&(n.fields[t].format="image",r.push(t))}),r.length>0){const e=[];Object.entries(n.mapping).forEach(t=>{r.forEach(r=>{const s=R.plotThumbnail(t[1][r]).then(e=>{n.mapping[t[0]][r]=e});e.push(s)})}),Promise.all(e).then(()=>t(n))}else t(n)})},graphDialog:function(t){L.getAppSetting("rdkit").then(t=>{e.select("#graph-measure").selectAll("option.rd").attr("disabled",t?null:"disabled")}),e.select("#graph-measure").on("change",function(){e.select("#graph-options").selectAll(".gls").attr("disabled","gls"===this.value?null:"disabled"),e.select("#graph-options").selectAll(".fmcs").attr("disabled","rdfmcs"===this.value?null:"disabled")}),e.select("#graph-submit").on("click",()=>{e.select("#loading-circle").style("display","inline");const n=b.value("#graph-measure"),r={measure:n,threshold:b.valueFloat("#graph-thld"),ignoreHs:b.checked("#graph-ignoreh"),diameter:"gls"===n?b.valueInt("#graph-diam"):null,maxTreeSize:"gls"===n?b.valueInt("#graph-tree"):null,molSizeCutoff:"gls"===n?b.valueInt("#graph-skip"):null,timeout:"rdfmcs"===n?b.valueInt("#graph-timeout"):null};t(r)})},graphConfigDialog:function(t,n,r){e.select("#graphconfig-thld").attr("value",t).attr("max",1).attr("min",n),e.select("#graphconfig-submit").on("click",()=>{const e=b.valueFloat("#graphconfig-thld");e<n||r(e)})},communityDialog:function(t){e.select("#community-name").attr("value","comm_"),e.select("#community-submit").on("click",()=>{const e={name:b.value("#community-name"),nulliso:b.checked("#community-nulliso")};t(e)})},importConfirmDialog:function(t){e.select("#importconfirm-overwrite").on("click",()=>t("overwrite")),e.select("#importconfirm-keepboth").on("click",()=>t("keepboth")),e.select("#importconfirm-cancel").on("click",()=>t("cancel"))}},N={interactiveInsert:function(e){return L.getTable(e.id).then(t=>t?e.revision==t.revision?Promise.reject(e.id):($("#importconfirm-dialog").modal("toggle"),new Promise(t=>{z.importConfirmDialog(n=>{"overwrite"===n&&t(e),"keepboth"===n&&(e.id=D.uuidv4(),t(e))})})):Promise.resolve(e)).then(e=>L.insertTable(e).then(()=>e.id),e=>e?Promise.resolve(e):Promise.reject())},fetchResults:function(e="update"){return L.getTable(P.URLQuery().id).then(e=>v.ongoing(e)?e:Promise.reject()).then(t=>{const n={id:t.id,command:e};return S.get("res",n).then(S.json).then(L.updateTable,S.error)},()=>Promise.resolve())},registerServiceWorker:f,loader:function(){const e=S.get("server").then(S.json).catch(()=>null),t=L.getAppSetting("serverInstance");return Promise.all([e,t]).then(e=>{const t=e[0],n=e[1];return t?(t.debugMode?console.info("Off-line mode is disabled for debugging"):f(),t.instance===n?(console.info("Resource schema is already up to date"),Promise.resolve(t)):S.get("schema").then(S.json).then(e=>(console.info(`New resource schema version: ${t.instance}`),Promise.all([L.setResources(e.resources),L.setAppSetting("templates",e.templates),L.setAppSetting("compoundIDPlaceholder",e.compoundIDPlaceholder),L.setAppSetting("defaultDataType",e.defaultDataType),L.setAppSetting("serverInstance",t.instance),L.setAppSetting("rdkit",t.rdkit)]).then(()=>Promise.resolve(t))),S.error)):Promise.resolve(null)})}},_={renderStatus:function(t,n,r){e.select("#loading-circle").style("display","none"),e.select("title").text(t.name),e.select("#title").text(t.name),e.select("#refresh").style("display",v.ongoing(t)?"inline-block":"none"),e.select("#abort").style("display",v.ongoing(t)?"inline-block":"none");const s={nodes:"entries found",edges:"connections created"}[t.dataType];e.select("#progress").text(`(${t.status} - ${t.records.length} ${s} in ${t.execTime} sec.)`),v.ongoing(t)&&e.select("#progress").append("div").append("progress").attr("max",100).attr("value",t.progress).text(`${t.progress}%`),e.select("#refresh").on("click",n),e.select("#abort").on("click",()=>{e.select("#confirm-message").text("Are you sure you want to abort this calculation job?"),e.select("#confirm-submit").classed("btn-primary",!1).classed("btn-warning",!0).on("click",r)}),console.info("Query"),console.info(t.query)},initializeWithData:function(){e.select("#new-data").style("display","none"),e.select("#loading-circle").style("display","none")},initialize:function(){e.select("#data-control").style("display","none"),e.select("#nodedata").style("display","none"),e.select("#refresh").style("display","none"),e.select("#abort").style("display","none"),e.select("#loading-circle").style("display","none"),e.select("#status").selectAll("li").style("display","none")}};const U={numeric:120,text:200,none:200},E={numeric:40,text:40,none:200};var B={createDataGrid:function(e,t){e.select("div.dg-header").size()&&e.select("div.dg-header").remove(),e.append("div").classed("dg-header",!0),e.select("div.dg-viewport").size()&&e.select("div.dg-viewport").remove(),e.append("div").classed("dg-viewport",!0).append("div").classed("dg-body",!0);const n=t.fields.filter(e=>e.visible).map(e=>(e.width=U[v.sortType(e.format)],e.height=E[v.sortType(e.format)],e)),r={height:n.reduce((e,t)=>e.height>t.height?e:t).height,width:n.reduce((e,t)=>({width:e.width+t.width})).width};e.style("width",`${r.width}px`),e.select(".dg-header").datum(r);const s=e.select(".dg-header").selectAll(".dg-hcell").data(n,e=>e.key);s.exit().remove(),s.enter().append("div").classed("dg-hcell",!0).style("display","inline-block").merge(s).style("width",e=>`${e.width}px`).text(e=>e.name)},dataGridRecords:h,addSort:function(t,n,r){t.select(".dg-header").selectAll(".dg-hcell").filter(e=>"none"!==v.sortType(e.format)).append("span").append("a").attr("id",e=>`sort-${e.key}`).text("^v").style("display","inline-block").style("width","30px").style("text-align","center").on("click",s=>{const o="v"===e.select(`#sort-${s.key}`).text();e.select(`#sort-${s.key}`).text(o?"^":"v");const l="numeric"===v.sortType(s.format),a=o?l?C.numericAsc:C.textAsc:l?C.numericDesc:C.textDesc,i=n.sort((e,t)=>a(e[s.key],t[s.key]));h(t,i,r)})}};return{grid:B,render:g,run:function(){if(e.select("#import-json").on("click",()=>document.getElementById("select-file").click()),e.select("#select-file").on("change",()=>{const e=document.getElementById("select-file").files[0];w.loadJSON(e).then(y)}),P.URLQuery().hasOwnProperty("location")){const e=P.URLQuery().location;return w.fetchJSON(e).then(N.interactiveInsert).then(e=>{window.location=`datatable.html?id=${e}`})}return N.loader().then(t=>(t||e.selectAll(".online-command").style("color","#cccccc").classed("disabled",!0).on("click",()=>e.event.stopPropagation()),P.URLQuery().hasOwnProperty("id")?(_.initializeWithData(),N.fetchResults().then(g)):(_.initialize(),z.sdfDialog(y),t?L.getResources().then(e=>{const t=e.filter(e=>"chemical"===e.domain);z.pickDialog(t,y),z.structDialog(t,y),z.propDialog(t,y)}):Promise.resolve())))}}});
//# sourceMappingURL=kwdatatable.js.map
