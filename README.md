
Kiwiii
================

Kiwiii is a web application package for chemical data analysis and visualization.


Screen shots
--------------

[<img src="img/table-view.png" width="260" height="160" alt="Table view" style="margin: 5px"/>](img/table-view.png)
[<img src="img/network-view.png" width="260" height="160" alt="Network view" style="margin: 5px"/>](img/network-view.png)
[<img src="img/control-panel.png" width="260" height="160" alt="Control panel" style="margin: 5px"/>](img/control-panel.png)



Embedded view examples (Bl.ocks)
---------------------------------

[![thumbnail](https://gist.githubusercontent.com/mojaie/dee158bd95a6e3f9e871c7cf112a335c/raw/c25ee931fead003248f7770f69b51fa28424063f/thumbnail.png)](https://bl.ocks.org/mojaie/dee158bd95a6e3f9e871c7cf112a335c)
[![thumbnail](https://gist.githubusercontent.com/mojaie/fe6db9906cd3c4ccc38463f177e4a6a7/raw/91517ccdc20a925ee2a1e1bce1116636ea2a627d/thumbnail.png)](https://bl.ocks.org/mojaie/fe6db9906cd3c4ccc38463f177e4a6a7)


Supported browsers
--------------------

- Google Chrome 57+
- Mozilla Firefox 50+ (may have some layout issues)


Features
--------------


- Datagrid view
  - [SlickGrid![ext](./img/external_link.svg)](https://github.com/mleibman/SlickGrid)-like smooth scroll datatable
  - Sortable
  - PNG, SVG image column (ex. chemical structure column)
  - Plot column ([Vega version 3![ext](./img/external_link.svg)](https://vega.github.io/vega/) plot data)
  - Export to SDFile and Excel (requires [Flashflood![ext](./img/external_link.svg)](https://github.com/mojaie/flashflood) server)
- Network view
  - Visualized network of chemical structure nodes connected with structure similarity relationship (known as [Chemical Space Network![ext](./img/external_link.svg)](https://doi.org/10.1007/s10822-014-9760-0))

  - Force-directed layout implemented with d3-force
  - Interactive zoom
  - Community detection ([jLouvain![ext](./img/external_link.svg)](https://github.com/upphiminn/jLouvain))
- Profile view
- Control panel


Web application demo
---------------------


- [Datagrid view (DrugBank Approved drugs)](https://mojaie.github.io/kiwiii/datagrid.html?location=resources/DrugBank5.0.5_FDA_Approved.ndc)


- [Network view (DrugBank Approved drugs)](https://mojaie.github.io/kiwiii/network.html?location=resources/DrugBank5.0.5_FDA_Approved_GLS08.gfc)


- [Control panel](https://mojaie.github.io/kiwiii/control.html)
  - You can save your data view into Indexed DB local storage by clicking "Save view" in the control menu. Control panel shows the list of dataset stored in the web browser. Click "Reset local datastore" button to clean up it. Be careful not to leave confidential data on public access PC.


If you already have a table data file (.ndc, .ndr) or a network data file(.gfc, .gfr), use the following link and then load the data.

- [Load new datagrid view](https://mojaie.github.io/kiwiii/datagrid.html)

- [Load new network view](https://mojaie.github.io/kiwiii/network.html)



API Documentation (WIP)
------------------------

https://mojaie.github.io/kiwiii/docs




License
--------------

[MIT license](http://opensource.org/licenses/MIT)



Copyright
--------------

(C) 2014-2018 Seiji Matsuoka
