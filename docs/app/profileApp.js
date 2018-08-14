// https://github.com/mojaie/kiwiii Version 1.0.0-alpha.3. Copyright 2018 Seiji Matsuoka.
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("lodash"),require("d3"),require("Dexie"),require("vega")):"function"==typeof define&&define.amd?define(["lodash","d3","Dexie","vega"],t):e.profileApp=t(e._,e.d3,e.Dexie,e.vega)}(this,function(e,t,s,o){"use strict";const n=!1;e=e&&e.hasOwnProperty("default")?e.default:e,t=t&&t.hasOwnProperty("default")?t.default:t,s=s&&s.hasOwnProperty("default")?s.default:s,o=o&&o.hasOwnProperty("default")?o.default:o;var r={URLQuery:function(){const t=window.location.search.substring(1).split("&").map(e=>e.split("="));return e.fromPairs(t)},compatibility:function(){},registerServiceWorker:function(){"serviceWorker"in navigator?n?console.info("Service worker is disabled for debugging"):window.addEventListener("load",()=>{navigator.serviceWorker.register("../sw.js")}):console.info("Service worker is not supported")}};const i="../req/";function a(e,t={}){const s=Object.keys(t).length?`?query=${JSON.stringify(t)}`:"";return fetch(`${i}${e}${s}`,{credentials:"include"}).then(e=>200!==e.status?Promise.reject(new Error(e.statusText)):Promise.resolve(e))}function l(e){return e.json()}var d={get:a,json:l,text:function(e){return e.text()},blob:function(e){return e.blob()},post:function(e,t){return fetch(`${i}${e}`,{method:"POST",body:t,credentials:"include"}).then(e=>200!==e.status?Promise.reject(new Error(e.statusText)):Promise.resolve(e))},error:function(e){return console.error(e),null},serverStatus:function(){const e={};return a("server").then(l).then(t=>{e.server=t}).then(()=>a("schema")).then(l).then(t=>{e.schema=t}).then(()=>e)}};const c="../assets/icon/";var p={iconBaseURL:c,buttonBox:function(e,t,s){e.classed("form-group",!0).classed("mb-1",!0).append("button").classed("btn",!0).classed(`btn-${s}`,!0).classed("btn-sm",!0).text(t)},menuButton:function(e,t,s){e.classed("btn",!0).classed(`btn-${s}`,!0).classed("btn-sm",!0).classed("mr-1",!0).text(t)},menuButtonLink:function(e,t,s,o){e.classed("btn",!0).classed(`btn-${s}`,!0).classed("btn-sm",!0).classed("mr-1",!0).attr("role","button").attr("href","#"),e.append("img").attr("src",o?`${c}${o}.svg`:null).style("width","1.25rem").style("height","1.25rem"),e.append("span").style("vertical-align","middle").text(t)},menuModalLink:function(e,t,s,o,n){e.classed("btn",!0).classed(`btn-${o}`,!0).classed("btn-sm",!0).classed("mr-1",!0).attr("href","#").attr("role","button").attr("data-toggle","modal").attr("data-target",`#${t}`),e.append("img").attr("src",n?`${c}${n}.svg`:null).style("width","1.25rem").style("height","1.25rem"),e.append("span").classed("label",!0).style("vertical-align","middle").text(s)},dropdownMenuButton:function(e,t,s,o){e.classed("btn-group",!0).classed("mr-1",!0);const n=e.append("button").classed("btn",!0).classed(`btn-${s}`,!0).classed("btn-sm",!0).classed("dropdown-toggle",!0).attr("data-toggle","dropdown");n.append("img").attr("src",o?`${c}${o}.svg`:null).style("width","1.25rem").style("height","1.25rem"),n.append("span").style("vertical-align","middle").text(t),e.append("div").classed("dropdown-menu",!0)},dropdownMenuItem:function(e,t,s){e.classed("dropdown-item",!0).attr("href","#"),e.append("img").attr("src",s?`${c}${s}.svg`:null).classed("mr-1",!0).style("width","2rem").style("height","2rem"),e.append("span").text(t)},dropdownMenuModal:function(e,t,s,o){e.classed("dropdown-item",!0).attr("href","#").attr("data-toggle","modal").attr("data-target",`#${s}`),e.append("img").attr("src",`${c}${o}.svg`).classed("mr-1",!0).style("width","2rem").style("height","2rem"),e.append("span").text(t)},dropdownMenuFile:function(e,s,o,n){e.classed("dropdown-item",!0).attr("href","#").on("click",function(){t.select(this).select("input").node().click()}),e.append("form").style("display","none").append("input").attr("type","file").attr("accept",o),e.append("img").attr("src",`${c}${n}.svg`).classed("mr-1",!0).style("width","2rem").style("height","2rem"),e.append("span").text(s)},dropdownMenuFileValue:function(e){return e.select("input").node().files[0]}};var u={sortType:function(e){return["numeric","d3_format"].includes(e)?"numeric":["text","compound_id","assay_id","list"].includes(e)?"text":["text_field","checkbox","html"].includes(e)?"html":"none"},formatNum:function(e,s){return null==e||Number.isNaN(e)?"":e==parseFloat(e)?t.format(s)(e):e},partialMatch:function(e,t){return null!=t&&""!==t&&-1!==t.toString().toUpperCase().indexOf(e.toString().toUpperCase())},uuidv4:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})}};const h={Queued:"ready","In progress":"running",Aborting:"running",Aborted:"aborted",Completed:"done",Failure:"failure"},f={datatable:"nodes",connection:"edges"};function m(e){const t=e.columns.map(e=>("numeric"===e.sort?e.format="numeric":"text"===e.sort?e.format="text":"none"===e.sort&&(e.format="raw"),e));return{id:e.id,name:e.name,dataType:f[e.format],schemaVersion:.8,revision:0,status:h[e.status],fields:t,records:e.records,query:e.query,taskCount:e.searchCount,doneCount:e.searchDoneCount|e.searchCount,resultCount:e.recordCount,progress:100|e.progress,execTime:e.execTime,created:e.startDate|e.responseDate}}function g(e){return{id:e.id,name:e.name,dataType:e.dataType,schemaVersion:"0.10",revision:e.revision,status:e.status,fields:e.fields,records:e.records,query:e.query,progress:e.progress,execTime:e.execTime,created:e.created,reference:{}}}function w(e){let s=e;return s.edges.hasOwnProperty("schemaVersion")||s.edges.hasOwnProperty("$schema")||(s.nodes=m(s.nodes),s.edges=function(e,t){const s={fieldTransform:e.snapshot.fieldTransform,nodePositions:e.snapshot.nodePositions,nodeColor:{},nodeSize:{},nodeLabel:{},edge:{}};return e.snapshot.hasOwnProperty("nodeColor")?(s.nodeColor.id=e.snapshot.nodeColor.id,s.nodeColor.scale=e.snapshot.nodeColor.scale,s.nodeColor.field=t.find(t=>t.key===e.snapshot.nodeColor.column)):s.nodeColor={id:"color",field:t[0],scale:{scale:"linear",domain:[0,1],range:["black","white"],unknown:"gray"}},e.snapshot.hasOwnProperty("nodeSize")?(s.nodeSize.id=e.snapshot.nodeSize.id,s.nodeSize.scale=e.snapshot.nodeSize.scale,s.nodeSize.field=t.find(t=>t.key===e.snapshot.nodeSize.column)):s.nodeSize={id:"size",field:t[0],scale:{scale:"linear",domain:[0,1],range:[20,20],unknown:20}},e.snapshot.hasOwnProperty("nodeLabel")?(s.nodeLabel.id=e.snapshot.nodeLabel.id,s.nodeLabel.size=e.snapshot.nodeLabel.size,s.nodeLabel.text=e.snapshot.nodeLabel.text,s.nodeLabel.visible=e.snapshot.nodeLabel.visible,s.nodeLabel.scale=e.snapshot.nodeLabel.scale,s.nodeLabel.field=t.find(t=>t.key===e.snapshot.nodeLabel.column)):s.nodeLabel={id:"label",size:12,text:"index",visible:!1,field:t[0],scale:{scale:"linear",domain:[0,1],range:["black","white"],unknown:"gray"}},e.snapshot.hasOwnProperty("nodeContent")?s.nodeContent=e.snapshot.nodeContent:s.nodeContent={structure:{visible:!1}},e.snapshot.hasOwnProperty("edge")?s.edge=e.snapshot.edge:s.edge={id:"label",label:{size:10,visible:!1},visible:!0,scale:{scale:"linear",domain:[0,1],range:[5,5],unknown:5}},{id:e.id,name:e.name,dataType:f[e.format],schemaVersion:.8,revision:0,reference:{nodes:e.nodeTableId},status:h[e.status],fields:[{key:"source"},{key:"target"},{key:"weight"}],records:e.records,query:e.query,networkThreshold:e.networkThreshold,taskCount:e.searchCount,doneCount:e.searchDoneCount|e.searchCount,resultCount:e.recordCount,progress:100|e.progress,execTime:e.execTime,created:e.startDate|e.responseDate,snapshot:s}}(s.edges,s.nodes.fields)),"0.8"!=s.edges.schemaVersion&&.1!==s.edges.schemaVersion||((s=function(e){if(e.edges.hasOwnProperty("reference")||(e.edges.reference={nodes:e.edges.nodesID}),e.nodes.fields.find(e=>"_index"===e.key)){const t={};e.nodes.records.forEach((e,s)=>{e.index=s,e.structure=e._structure,t[e._index]=e.index,delete e._index,delete e._structure}),e.edges.records.forEach(e=>{e.source=t[e.source],e.target=t[e.target]}),e.nodes.fields.forEach(e=>{"_index"===e.key&&(e.key="index"),"_structure"===e.key&&(e.key="structure"),"numeric"===e.sort&&(e.format="numeric"),"text"===e.sort&&(e.format="text"),"none"===e.sort&&(e.format="raw")})}return e}(s)).nodes=g(s.nodes),s.edges=function(e){const s={networkThreshold:e.networkThreshold};return s.nodeContentVisible=e.snapshot.nodeContent.structure.visible,s.nodeColor=e.snapshot.nodeColor.scale||{},s.nodeColor.field&&(s.nodeColor.field=e.snapshot.nodeColor.field.key,"_index"===s.nodeColor.field&&(s.nodeColor.field="index")),"ordinal"===s.nodeColor.scale&&(s.nodeColor.range=t.schemeCategory20),s.nodeSize=e.snapshot.nodeSize.scale||{},e.snapshot.nodeSize.field&&(s.nodeSize.field=e.snapshot.nodeSize.field.key,"_index"===s.nodeSize.field&&(s.nodeSize.field="index")),s.nodeLabel={},e.snapshot.nodeLabel.text&&(s.nodeLabel.text=e.snapshot.nodeLabel.text.key,"_index"===s.nodeLabel.text&&(s.nodeLabel.text="index")),s.nodeLabel.size=e.snapshot.nodeLabel.size,s.nodeLabel.visible=e.snapshot.nodeLabel.visible,s.nodeLabelColor=e.snapshot.nodeLabel.scale||{},e.snapshot.nodeLabel.field&&(s.nodeLabelColor.field=e.snapshot.nodeLabel.field.key,"_index"===s.nodeLabelColor.field&&(s.nodeLabelColor.field="index")),"ordinal"===s.nodeLabelColor.scale&&(s.nodeLabelColor.range=t.schemeCategory20),s.edgeVisible=e.snapshot.edge.visible,s.edgeWidth=e.snapshot.edge.scale||{},s.edgeLabel={},s.edgeLabel.size=e.snapshot.edge.label.size,s.edgeLabel.visible=e.snapshot.edge.label.visible,s.networkThreshold=e.networkThreshold||e.query.threshold,s.coords=e.snapshot.nodePositions,{id:e.id,name:e.name,dataType:e.dataType,schemaVersion:"0.10",revision:e.revision,status:e.status,fields:e.fields,records:e.records,query:{params:e.query},progress:e.progress,execTime:e.execTime,created:e.created,snapshot:s,reference:e.reference}}(s.edges)),s.edges.hasOwnProperty("$schema")||(delete s.nodes.schemaVersion,delete s.edges.schemaVersion,delete s.nodes.revision,delete s.edges.revision,s.nodes.$schema="https://mojaie.github.io/flashflood/_static/specs/job_result_v1.0.json",s.edges.$schema="https://mojaie.github.io/flashflood/_static/specs/job_result_v1.0.json"),s}var y={convertPackage:function(e){let t={};if(!e.hasOwnProperty("views")){const s=new Date,o=e.hasOwnProperty("edges"),n=o?w(e):function(e){let t=e;return t.hasOwnProperty("schemaVersion")||t.hasOwnProperty("$schema")||(t=m(t)),"0.8"==t.schemaVersion&&(t=g(t=function(e){return e.records.forEach((e,t)=>{e.index=t,e.structure=e._structure,delete e._index,delete e._structure}),e.fields.forEach(e=>{"_index"===e.key&&(e.key="index"),"_structure"===e.key&&(e.key="structure"),"numeric"===e.sort&&(e.format="numeric"),"text"===e.sort&&(e.format="text"),"none"===e.sort&&(e.format="raw")}),e}(t))),t.hasOwnProperty("$schema")||(delete t.schemaVersion,delete t.revision,t.$schema="https://mojaie.github.io/flashflood/_static/specs/job_result_v1.0.json"),t.fields.forEach(e=>{"structure"===e.key&&(e.format="svg"),delete e.width,delete e.height}),t}(e),r=o?n.nodes:n;(t={$schema:"https://mojaie.github.io/kiwiii/specs/package_v1.0.json",name:n.edges.name,views:[],dataset:[]}).dataset.push({$schema:"https://mojaie.github.io/kiwiii/specs/collection_v1.0.json",collectionID:r.id,name:r.name,contents:[{$schema:r.$schema,workflowID:r.reference.workflow,name:r.name,fields:r.fields,records:r.records,created:r.created,status:r.status,query:r.query,execTime:r.execTime,progress:r.progress}]}),t.views.push({$schema:"https://mojaie.github.io/kiwiii/specs/datagrid_v1.0.json",viewID:r.id,name:r.name,viewType:"datagrid",rows:r.id,fields:r.fields,sortOrder:null,filterText:null,checkpoints:[{type:"convert",date:s.toString(),description:"converted from legacy format"}]}),o&&(t.dataset.push({$schema:"https://mojaie.github.io/kiwiii/specs/collection_v1.0.json",collectionID:n.edges.id,name:n.edges.name,contents:[{$schema:n.edges.$schema,workflowID:n.edges.reference.workflow,name:n.edges.name,fields:n.edges.fields,records:n.edges.records,created:n.edges.created,status:n.edges.status,query:n.edges.query,execTime:n.edges.execTime,progress:n.edges.progress}]}),t.views.push({$schema:"https://mojaie.github.io/kiwiii/specs/network_v1.0.json",viewID:n.edges.id,name:n.edges.name,viewType:"network",nodes:r.id,edges:n.edges.id,nodeColor:n.edges.snapshot.nodeColor,nodeSize:n.edges.snapshot.nodeSize,nodeLabel:n.edges.snapshot.nodeLabel,nodeLabelColor:n.edges.snapshot.nodeLabelColor,edgeWidth:n.edges.snapshot.edgeWidth,edgeLabel:n.edges.snapshot.edgeLabel,networkThreshold:n.edges.snapshot.networkThreshold,networkThresholdCutoff:n.edges.snapshot.networkThresholdCutoff,fieldTransform:n.edges.snapshot.fieldTransform,coords:n.edges.snapshot.coords,checkpoints:[{type:"convert",date:s.toString(),description:"converted from legacy format"}]})),t.views.filter(e=>"network"===e.viewType).forEach(e=>{e.minConnThld=e.networkThresholdCutoff,e.currentConnThld=e.networkThreshold,e.hasOwnProperty("nodeLabel")&&(e.nodeLabel.field=e.nodeLabel.text),e.hasOwnProperty("edgeLabel")&&(e.edgeLabel.field="weight"),e.hasOwnProperty("edgeWidth")&&(e.edgeWidth.field="weight")})}return t.views.filter(e=>"network"===e.viewType).forEach(e=>{e.nodeColor.field||(e.nodeColor.field="index"),e.nodeSize.field||(e.nodeSize.field="index"),e.nodeLabel.field||(e.nodeLabel.field="index"),e.nodeLabelColor.field||(e.nodeLabelColor.field="index"),e.edgeColor?e.edgeColor.field||(e.edgeColor.field="weight"):e.edgeColor={field:"weight",color:"monogray",scale:"linear",domain:[0,1],range:["#999999","#999999"],unknown:"#cccccc"},e.edgeWidth.field||(e.edgeWidth.field="weight"),e.edgeLabel.field||(e.edgeLabel.field="weight"),e.edgeLabelColor?e.edgeLabelColor.field||(e.edgeLabelColor.field="weight"):e.edgeLabelColor={field:"weight",color:"monoblack",scale:"linear",domain:[1,1],range:["#333333","#333333"],unknown:"#cccccc"}}),t}};const b={items:"storeID, sessionStarted"};let x=new s("Store");function v(){return x.items.orderBy("sessionStarted").reverse().toArray()}function k(e,t){return x.items.where("storeID").equals(e).modify(t).catch(e=>{console.error("IDBError: Update failed",e)})}x.version(1).stores(b);var I={reset:function(){return x.delete().then(()=>{(x=new s("Store")).version(1).stores(b)})},getAllItems:v,getItem:function(e){return x.items.where("storeID").equals(e).first().catch(t=>{console.error(`IDBError: Unexpected table ID: ${e}`,t)})},updateItem:k,deleteItem:function(e){return x.items.where("storeID").equals(e).delete()},getView:function(e,t){return v().then(t=>t.find(t=>t.storeID===e).views).then(s=>{const o=s.find(e=>e.viewID===t);if(o)return o.storeID=e,o})},appendView:function(e,t,s){return k(e,e=>{const o=e.views.findIndex(e=>e.viewID===t);e.views.splice(o+1,0,s)})},updateView:function(t,s,o){return k(t,t=>{const n=t.views.findIndex(e=>e.viewID===s);e.isFunction(o)?o(t.views[n]):t.views[n]=o})},deleteView:function(e,t){return k(e,e=>{const s=e.views.findIndex(e=>e.viewID===t);e.views.splice(s,1);const o={};e.dataset.forEach(e=>{o[e.collectionID]=0}),e.views.forEach(e=>{["rows","items","nodes","edges"].filter(t=>e.hasOwnProperty(t)).forEach(t=>{o[e[t]]+=1})}),Object.entries(o).forEach(t=>{if(!t[1]){const s=e.dataset.findIndex(e=>e.collectionID===t[0]);e.dataset.splice(s,1)}})})},getAllCollections:function(){return v().then(t=>e.flatten(t.map(e=>e.dataset.map(t=>(t.storeID=e.storeID,t)))))},getCollection:function(e,t){return v().then(t=>t.find(t=>t.storeID===e).dataset).then(s=>{const o=s.find(e=>e.collectionID===t);if(o)return o.storeID=e,o})},updateCollection:function(t,s,o){return k(t,t=>{const n=t.dataset.findIndex(e=>e.collectionID===s);e.isFunction(o)?o(t.dataset[n]):t.dataset[n]=o})},importItem:function(e){e=y.convertPackage(e);const t=new Date;return e.storeID=u.uuidv4().slice(0,8),e.sessionStarted=t.toString(),x.items.put(e)},newDatagrid:function(e){const t=(new Date).toLocaleString("en-GB",{timeZone:"Asia/Tokyo"}),s=u.uuidv4().slice(0,8),o=u.uuidv4().slice(0,8),n=e.workflowID.slice(0,8),r={$schema:"https://mojaie.github.io/kiwiii/specs/package_v1.0.json",storeID:s,name:e.name,views:[{$schema:"https://mojaie.github.io/kiwiii/specs/datagrid_v1.0.json",viewID:o,name:e.name,viewType:"datagrid",rows:n,checkpoints:[{type:"creation",date:t}]}],dataset:[{$schema:"https://mojaie.github.io/kiwiii/specs/collection_v1.0.json",collectionID:n,name:e.name,contents:[e]}],sessionStarted:t};return x.items.put(r).then(()=>({storeID:s,viewID:o}))},newNetwork:function(e,t,s,o){const n=u.uuidv4().slice(0,8),r=o.workflowID.slice(0,8);return k(e,e=>{e.views.push({$schema:"https://mojaie.github.io/kiwiii/specs/network_v1.0.json",viewID:n,name:`${s}_${o.name}`,viewType:"network",nodes:t,edges:r,minConnThld:o.query.params.threshold}),e.dataset.push({$schema:"https://mojaie.github.io/kiwiii/specs/collection_v1.0.json",collectionID:r,name:o.name,contents:[o]})}).then(()=>n)}};function C(e){const t={};return Object.entries(e.mapping).forEach(e=>{t[e[0]]=[e[1]]}),{created:e.created,fields:[e.field],key:e.key,mapping:t}}var T={singleToMulti:C,mappingToTable:function(e){const t=e.hasOwnProperty("field")?C(e):e;return{fields:[{key:t.key,format:"text"}].concat(t.fields),records:Object.entries(t.mapping).map(e=>{const s={};return s[t.key]=e[0],t.fields.forEach((t,o)=>{s[t.key]=e[1][o]}),s})}},tableToMapping:function(e,t,s=["index"]){const o={created:(new Date).toString(),fields:e.fields.filter(e=>e.key!==t).filter(e=>!s.includes(e.key)),key:t,mapping:{}};return e.records.forEach(e=>{o.mapping[e[t]]=o.fields.map(t=>e[t.key])}),o},csvToMapping:function(e){const t=e.split(/\n|\r|\r\n/),s=t.shift().split(","),o=s.shift(),n=new Date,r=[],i=[];s.forEach((e,t)=>{""!==e&&(r.push(t),i.push({key:e,format:"text"}))});const a={created:n.toString(),fields:i,key:o,mapping:{}};return t.forEach(e=>{const t=e.split(","),s=t.shift();a.mapping[s]=Array(r.length),r.forEach(e=>{a.mapping[s][e]=t[e]})}),a},apply:function(t,s){const o=s.hasOwnProperty("field")?C(s):s;t.records.filter(e=>o.mapping.hasOwnProperty(e[o.key])).forEach(e=>{o.fields.forEach((t,s)=>{e[t.key]=o.mapping[e[o.key]][s]})}),t.fields=e(t.fields).concat(o.fields).uniqBy("key").value()}};class D{constructor(e){this.autoIndex="index",this.collectionID=e.collectionID||null,this.storeID=e.storeID||null,this.name=e.name||null,e.records?(this.contents=[e],this.fields=[]):(this.contents=e.contents,this.fields=e.fields||[]),this.contents.forEach(e=>{e.fields.forEach(e=>this.addField(e))})}addField(e){this.fields.find(t=>t.key===e.key)||(e.hasOwnProperty("name")||(e.name=e.key),e.hasOwnProperty("visible")||(e.visible=!0),e.hasOwnProperty("d3_format")&&(e.format="d3_format"),e.hasOwnProperty("format")||(e.format="raw"),this.fields.push(e))}updateFields(e){this.fields=[],e.forEach(e=>this.addField(e))}joinFields(e){this.contents.forEach(t=>{T.apply(t,e)}),e.hasOwnProperty("fields")?e.fields.forEach(e=>this.addField(e)):this.addField(e.field)}apply(e){this.contents.forEach(t=>{t.records.forEach(t=>{e(t)})})}records(){return e.flatten(this.contents.map(e=>e.records))}fetch(e){const t=this.contents.filter(e=>["running","ready","interrupted","queued"].includes(e.status)).map(t=>{const s={id:t.workflowID,command:e};return d.get("progress",s).then(d.json).then(e=>I.updateCollection(this.storeID,this.collectionID,t=>{const o=t.contents.findIndex(e=>e.workflowID===s.id);"failure"===e.status?t.contents[o].status="failure":t.contents[o]=e}))});return Promise.all(t).then(()=>I.getCollection(this.storeID,this.collectionID)).then(e=>{this.contents=e.contents})}pull(){return this.fetch("pull")}abort(){return this.fetch("abort")}size(){return e.sum(this.contents.map(e=>e.records.length))}status(){return this.contents.some(e=>"interrupted"===e.status)?"interrupted":this.contents.some(e=>"running"===e.status)?"running":this.contents.some(e=>"queued"===e.status)?"queued":this.contents.some(e=>"ready"===e.status)?"ready":this.contents.some(e=>"aborted"===e.status)?"aborted":this.contents.some(e=>"failure"===e.status)?"failure":"done"}ongoing(){return["ready","queued","running","interrupted"].includes(this.status())}progress(){return e.min(this.contents.map(e=>e.progress))}execTime(){return e.sum(this.contents.map(e=>e.execTime))}export(){return{$schema:"https://mojaie.github.io/kiwiii/specs/collection_v1.0.json",collectionID:this.collectionID,name:this.name,fields:this.fields,contents:this.contents}}}function _(e,t){const s=e.select(".dg-header");s.selectAll(".dg-hcell").remove(),s.selectAll(".dg-hcell").data(t.visibleFields).enter().append("div").classed("dg-hcell",!0).call(t.headerCellRenderer)}function L(e,s){const o=e.select(".dg-body").selectAll(".dg-row").data(s.recordsToShow(),s.keyFunc);o.exit().remove(),o.selectAll(".dg-cell").remove(),o.enter().append("div").attr("class","dg-row").style("position","absolute").style("width","100%").merge(o).style("height",`${s.rowHeight}px`).each(function(e,o){const n=s.viewportTop+o,r=n*s.rowHeight;t.select(this).style("transform",`translate(0px, ${r}px)`).classed("odd",n%2==0).call(s.rowFactory(),e)})}function $(e,t,s){e.select(".dg-body").style("height",`${t.bodyHeight}px`),t.setScrollPosition(s),e.call(L,t,s),e.select(".dg-viewport").node().scrollTop=s*t.rowHeight}function S(e,t){const s=e.select(".dg-viewport"),o=s.node().getBoundingClientRect().top;t.resizeViewport(window.innerHeight-o-5),s.style("height",`${t.viewportHeight}px`)}var F={headerCellRenderer:function(e){e.style("display","inline-block").style("width",e=>`${e.width}%`).text(e=>e.name)},updateHeader:_,updateRows:L,updateViewport:$,resize:S,datagrid:function(e,t){e.append("div").classed("dg-header",!0),e.append("div").classed("dg-viewport",!0).style("overflow-y","auto").on("scroll",function(){const s=Math.floor(this.scrollTop/t.rowHeight);s!==t.previousViewportTop&&(t.setScrollPosition(s),e.call(L,t,s))}).append("div").classed("dg-body",!0).style("position","relative"),t.updateContentsNotifier=(()=>{t.applyHeader(),e.call(_,t),e.call(S,t),t.applyData(),e.call($,t,t.viewportTop)}),t.updateFilterNotifier=(s=>{t.setFilterText(s),e.call($,t,0)})}};function O(e,t,s){e.text(u.formatNum(t[s.key],s.d3_format))}function j(e,t,s){e.text(t[s.key])}function V(e,t,s){e.html(t[s.key])}function P(e,t,s){e.append("a").attr("href",`profile.html?compound=${t[s.key]}`).attr("target","_blank").text(t[s.key])}function B(e,t,s){e.append("img").attr("width",180).attr("height",180).attr("src",t[s.key])}function z(e,t,s){e.append("input").attr("type","checkbox").property("checked",t[s.key]).property("disabled",!!s.disabled&&t[s.disabled]).on("click",function(){t[s.key]=this.checked})}function R(e,t,s){e.append("input").attr("type","text").style("width","90%").property("value",t[s.key]).on("change",function(){t[s.key]=this.value})}function E(e,t){e.call(t)}const q={numeric:j,text:j,date:function(e,t,s){e.text(t[s.key])},raw:j,d3_format:O,compound_id:P,assay_id:j,list:j,plot:{plotCell:function(e,t,s){new o.View(o.parse(t[s.key])).initialize(e.node()).run()},plotThumbnail:function(e){return new o.View(o.parse(e)).toImageURL("png")},binaryToDataURI:function(e){return new Promise(t=>{const s=new FileReader;s.onload=(e=>{t(e.target.result)}),s.readAsDataURL(e)})}}.plotCell,image:B,checkbox:z,text_field:R,control:E,svg:V,html:V};function H(e){e.classed("dg-cell",!0).classed("align-middle",!0).classed("text-truncate",!0).style("display","inline-block")}var N={d3Format:O,text:j,html:V,compound_id:P,image:B,checkbox:z,textField:R,call:E,rowCell:H,rowFactory:function(e){return(t,s)=>{e.forEach(e=>{const o=t.append("div").call(H).style("width",`${e.width}%`);s.hasOwnProperty(e.key)&&o.call(q[e.format],s,e)})}}};class M{constructor(e,t){this.storeID=e.storeID||null,this.viewID=e.viewID||null,this.name=e.name||null,this.sortOrder=e.sortOrder||[],this.filterText=e.filterText||null,this.rows=new D(t),this.visibleFields=null,this.sortedRecords=null,this.filteredRecords=null,this.defaultColumnHeight={numeric:40,text:40,html:40,none:200},this.scrollBarSpace=20,this.keyFunc=(e=>e.index),this.rowHeight=null,this.bodyHeight=null,this.viewportHeight=null,this.numViewportRows=null,this.viewportTop=0,this.previousViewportTop=null,this.viewportBottom=null,this.fixedViewportHeight=null,this.updateContentsNotifier=null,this.updateFilterNotifier=null,this.headerCellRenderer=F.headerCellRenderer,this.rowFactory=(()=>N.rowFactory(this.visibleFields))}setViewportSize(e){this.viewportHeight=this.fixedViewportHeight||e}setScrollPosition(e){this.previousViewportTop=this.viewportTop,this.viewportTop=e,this.viewportBottom=Math.min(this.viewportTop+this.numViewportRows,this.filteredRecords.length)}setNumViewportRows(){this.numViewportRows=Math.ceil(this.viewportHeight/this.rowHeight)+1}resizeViewport(e){this.setViewportSize(e),this.setNumViewportRows()}applyHeader(){this.visibleFields=this.rows.fields.filter(e=>e.visible);const e=this.visibleFields.reduce((e,t)=>e+(t.widthf||1),0);this.visibleFields=this.visibleFields.map(t=>{const s={width:(t.widthf||1)/e*100,height:t.height||this.defaultColumnHeight[u.sortType(t.format)]};return Object.assign(s,t)}),this.rowHeight=this.visibleFields.reduce((e,t)=>e.height>t.height?e:t,0).height}applyData(){this.setNumViewportRows(),this.applyOrder()}applyOrder(t,s){if(t)this.sortedRecords=e.orderBy(this.rows.records().slice(),[t],[s]);else{const t=this.sortOrder.map(e=>e.key),s=this.sortOrder.map(e=>e.order);t&&(this.sortedRecords=e.orderBy(this.rows.records().slice(),t,s))}this.applyFilter()}applyFilter(){if(null===this.filterText)this.filteredRecords=this.sortedRecords.slice();else{const e=this.visibleFields.filter(e=>"none"!==u.sortType(e.format)).map(e=>e.key);this.filteredRecords=this.sortedRecords.filter(t=>e.some(e=>u.partialMatch(this.filterText,t[e])))}this.bodyHeight=this.filteredRecords.length*this.rowHeight}setSortOrder(e,t){const s=this.sortOrder.findIndex(e=>e.key),o={key:e,order:t};-1!==s&&this.sortOrder.splice(s,1),this.sortOrder.splice(0,0,o),this.applyOrder(e,t)}setFilterText(e){this.filterText=e,this.applyFilter()}updateFields(e){this.rows.updateFields(e)}joinFields(e){this.rows.joinFields(e),this.applyData()}recordsToShow(){return this.filteredRecords.slice(this.viewportTop,this.viewportBottom)}save(){return I.updateItem(this.storeID,e=>{const t=e.dataset.findIndex(e=>e.collectionID===this.rows.collectionID);e.dataset[t]=this.rows.export();const s=e.views.findIndex(e=>e.viewID===this.viewID);e.views[s]=this.export()})}export(){return{$schema:"https://mojaie.github.io/kiwiii/specs/datagrid_v1.0.json",viewID:this.viewID,name:this.name,viewType:"datagrid",rows:this.rows.collectionID,sortOrder:this.sortOrder,filterText:this.filterText}}}function A(e){return parseInt(e.select("input").property("value"))}function W(e){return parseFloat(e.select("input").property("value"))}var U={textBox:function(e,t){e.classed("form-group",!0).classed("form-row",!0).classed("align-items-center",!0),e.append("label").classed("col-form-label",!0).classed("col-form-label-sm",!0).classed("col-4",!0).text(t),e.append("input").classed("form-control",!0).classed("form-control-sm",!0).classed("col-8",!0).attr("type","text")},updateTextBox:function(e,t){e.select("input").property("value",t)},textBoxValue:function(e){return e.select("input").property("value")},readonlyBox:function(e,t){e.classed("form-group",!0).classed("form-row",!0).classed("align-items-center",!0),e.append("label").classed("col-form-label",!0).classed("col-form-label-sm",!0).classed("col-4",!0).text(t),e.append("input").classed("form-control-plaintext",!0).classed("form-control-sm",!0).classed("col-8",!0).attr("type","text").attr("readonly","readonly")},textareaBox:function(e,t,s){e.classed("form-group",!0).classed("form-row",!0),e.append("label").classed("col-form-label",!0).classed("col-form-label-sm",!0).classed("col-4",!0).text(t),e.append("textarea").classed("form-control",!0).classed("form-control-sm",!0).classed("col-8",!0).attr("rows",s)},updateTextareaBox:function(e,t){e.select("textarea").property("value",t)},updateTextareaPlaceholder:function(e,t){e.select("textarea").attr("placeholder",t)},textareaBoxValue:function(e){const t=e.select("textarea").property("value");if(t)return t;const s=e.select("textarea").attr("placeholder");return s||""},textareaBoxLines:function(e){const t=e.select("textarea").property("value");if(t)return t.split("\n").filter(e=>e.length>0);const s=e.select("textarea").attr("placeholder");return s?s.split("\n").filter(e=>e.length>0):[]},checkBox:function(e,t){const s=e.classed("form-group",!0).classed("form-row",!0).classed("form-check",!0).append("label").classed("form-check-label",!0).classed("col-form-label-sm",!0);s.append("input").classed("form-check-input",!0).attr("type","checkbox"),s.append("span").text(t)},updateCheckBox:function(e,t){e.select("input").property("checked",t)},checkBoxValue:function(e){return e.select("input").property("checked")},numberBox:function(e,t,s,o,n){e.classed("form-group",!0).classed("form-row",!0).classed("align-items-center",!0),e.append("label").classed("col-form-label",!0).classed("col-form-label-sm",!0).classed("col-4",!0).text(t),e.append("input").classed("form-control",!0).classed("form-control-sm",!0).classed("col-8",!0).attr("type","number").attr("min",s).attr("max",o).attr("step",n)},updateNumberBox:function(e,t){e.select("input").property("value",t)},numberIntValid:function(e){const t=A(e),s=parseInt(e.select("input").attr("min")),o=parseInt(e.select("input").attr("max")),n=!isNaN(t)&&t>=s&&t<=o;return e.select("input").style("background-color",n?"#ffffff":"#ffcccc"),n},numberFloatValid:function(e){const t=W(e),s=parseInt(e.select("input").attr("min")),o=parseInt(e.select("input").attr("max")),n=!isNaN(t)&&t>=s&&t<=o;return e.select("input").style("background-color",n?"#ffffff":"#ffcccc"),n},numberBoxIntValue:A,numberBoxFloatValue:W,colorBox:function(e,s){e.classed("form-row",!0).classed("align-items-center",!0).on("change",()=>{t.event.stopPropagation()}),e.append("div").classed("form-group",!0).classed("col-form-label",!0).classed("col-form-label-sm",!0).classed("col-4",!0).classed("mb-1",!0).text(s),e.append("div").classed("form-group",!0).classed("col-form-label",!0).classed("col-form-label-sm",!0).classed("col-4",!0).classed("mb-1",!0).append("input").classed("form-control",!0).classed("form-control-sm",!0).attr("type","color")},updateColorBox:function(e,t){e.select("input").property("value",t)},colorBoxValue:function(e){return e.select("input").property("value")},fileInputBox:function(e,t,s){e.classed("form-group",!0).classed("form-row",!0),e.append("label").classed("col-form-label",!0).classed("col-form-label-sm",!0).classed("col-4",!0).text(t),e.append("input").classed("form-control",!0).classed("form-control-sm",!0).classed("form-control-file",!0).classed("col-8",!0).attr("type","file").attr("accept",s)},clearFileInput:function(e){const t=e.select("input").attr();e.select("input").remove(),e.append("input").classed("form-control",!0).classed("form-control-sm",!0).classed("form-control-file",!0).classed("col-8",!0).attr("type","file").attr("accept",t)},fileInputBoxValue:function(e){return e.select("input").property("files")[0]}};var Q={setFilter:function(e,t){const s=e.classed("row",!0).classed("justify-content-end",!0).append("div").classed("col-5",!0).call(U.textBox,"Search");s.select("label").classed("text-right",!0),s.select("input").on("keyup",function(){t.updateFilterNotifier(U.textBoxValue(s))})}};var G={setSort:function(e,s){s.headerCellRenderer=(o=>{o.style("display","inline-block").style("width",e=>`${e.width}%`).text(e=>e.name).filter(e=>"none"!==u.sortType(e.format)).append("span").append("a").attr("id",e=>`sort-${e.key}`).text("^v").style("display","inline-block").style("width","30px").style("text-align","center").on("click",o=>{const n="v"===t.select(`#sort-${o.key}`).text();t.select(`#sort-${o.key}`).text(n?"^":"v"),s.setSortOrder(o.key,n?"desc":"asc"),e.call(F.updateRows,s)})})}};var J={table:function(e,t,s,o,n){const r=new M({},{fields:t,records:s});r.keyFunc=(e=>e),o&&(r.rowFactory=(()=>o(r.visibleFields))),r.fixedViewportHeight=n||300,e.append("div").classed("table",!0).call(F.datagrid,r),e.datum(r)},filterTable:function(e,t,s,o,n){const r=new M({},{fields:t,records:s});o&&(r.rowFactory=(()=>o(r.visibleFields))),r.fixedViewportHeight=n||300,e.append("div").classed("search",!0).call(Q.setFilter,r),e.append("div").classed("table",!0).call(F.datagrid,r),e.datum(r)},filterSortTable:function(e,t,s,o,n){const r=new M({},{fields:t,records:s});o&&(r.rowFactory=(()=>o(r.visibleFields))),r.fixedViewportHeight=n||300,e.append("div").classed("search",!0).call(Q.setFilter,r),e.append("div").classed("table",!0).call(G.setSort,r).call(F.datagrid,r),e.datum(r)},update:function(e,t,s){const o={fields:t,records:s},n=e.datum();n.rows=new D(o),n.updateContentsNotifier()},updateRecords:function(e,t){const s=e.datum();s.rows.contents[0].records=t,s.updateContentsNotifier()},tableRecords:function(e){return e.datum().rows.records()}};function Z(e){return d.get("schema").then(d.json).then(t=>(function(e,t){const s={},o={workflow:"search",targets:t.filter(e=>"chemical"===e.domain).map(e=>e.id),key:"compound_id",values:[e]};return d.get(o.workflow,o).then(d.json).then(e=>{s.compound={fields:[{key:"key",name:"key",format:"text"},{key:"value",name:"value",format:"text"}],records:[{key:"Formula",value:e.records[0]._formula},{key:"Molecular weight",value:e.records[0]._mw},{key:"Wildman-Crippen logP",value:e.records[0]._logp},{key:"Non-hydrogen atom count",value:e.records[0]._nonH}]},s.cid=e.records[0].compound_id,s.name=e.records[0].name,s.src=e.records[0].__source,s.struct=e.records[0].structure}).then(()=>{const e={workflow:"exact",targets:t.filter(e=>"chemical"===e.domain).map(e=>e.id),queryMol:{format:"dbid",source:s.src,value:s.cid},params:{ignoreHs:!0}};return d.get(e.workflow,e)}).then(d.json).then(e=>{s.aliases=e,s.aliases.fields=[{key:"index",name:"Index",format:"d3_format",d3_format:"d"},{key:"compound_id",name:"Compound ID",format:"compound_id"},{key:"name",name:"Name",format:"text"},{key:"__source",name:"Source",format:"text"}]}).then(()=>{const s={workflow:"profile",compound_id:e,targets:t.filter(e=>"activity"===e.domain).map(e=>e.id)};return d.get(s.workflow,s)}).then(d.json).then(e=>(s.assays=e,s.assays.fields=[{key:"index",name:"Index",format:"d3_format",d3_format:"d"},{key:"assay_id",name:"Assay ID",format:"assay_id"},{key:"value_type",name:"Value type",format:"text"},{key:"value",name:"Value",format:"numeric"}],s))})(e,t.resources)).catch(()=>(console.info("Server did not respond"),{aliases:{},assays:{},compound:{}})).then(e=>{const s=t.select("#contents").style("padding-left","10%").style("padding-right","10%");s.append("h2").classed("mt-5",!0).text("Compound ID"),s.append("div").classed("mb-5",!0).text(e.cid),s.append("h2").classed("mt-5",!0).text("Name"),s.append("div").classed("mb-5",!0).text(e.name),s.append("h2").classed("mt-5",!0).text("Source"),s.append("div").classed("mb-5",!0).text(e.src),s.append("h2").classed("mt-5",!0).text("Structure"),s.append("div").classed("mb-5",!0).html(e.struct),s.append("h2").classed("mt-5",!0).text("Chemical properties"),s.append("div").classed("mb-5",!0).call(J.table,e.compound.fields,e.compound.records,null,150),s.append("h2").classed("mt-5",!0).text("Aliases"),s.append("div").classed("mb-5",!0).call(J.table,e.aliases.fields,e.aliases.records,null,150),s.append("h2").classed("mt-5",!0).text("Assay results"),s.append("div").classed("mb-5",!0).call(J.filterSortTable,e.assays.fields,e.assays.records,null,400)})}return{run:function(){const e=r.compatibility();if(e)return void t.select("body").style("color","#ff0000").text(e);t.select("#menubar").classed("my-1",!0).append("a").call(p.menuButtonLink,"Dashboard","outline-secondary","db-gray").attr("href","dashboard.html").attr("target","_blank");const s=r.URLQuery().compound||null;if(!s)return;return document.location.protocol,"onLine"in navigator&&navigator.onLine,r.registerServiceWorker(),Z(s)}}});
//# sourceMappingURL=profileApp.js.map
