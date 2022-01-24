import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface Menu {
  name: String;
  choices: Choices[];
  related: Related[];
}

interface Choices {
  name: String;
}

interface Related {
  name: String;
  choices: Choices[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  products: Menu [];
  title = 'Restaurant menu';
  data: any;

  constructor(private httpClient: HttpClient) {
    this.products = [];
    this.httpClient.get("assets/menu.json").subscribe((reportData: any) => {
      console.log(reportData);
      this.products = reportData;
    });

    this.data = {};
    this.data.isAllSelected = false;
    this.data.isAllCollapsed = false;

    //List object having hierarchy of parents and its children
    this.data.ParentChildchecklist = [
      {
        id: 1, value: 'Elenor Anderson', isSelected: false, isClosed: false,
        childList: [
          {
            id: 1, parent_id: 1, value: 'child 1', isSelected: false
          },
          {
            id: 2, parent_id: 1, value: 'child 2', isSelected: false
          }
        ]
      },
      {
        id: 2, value: 'Caden Kunze', isSelected: false, isClosed: false, childList: [
          {
            id: 1, parent_id: 1, value: 'child 1', isSelected: false
          },
          {
            id: 2, parent_id: 1, value: 'child 2', isSelected: false
          }
        ]
      },
      {
        id: 3, value: 'Ms. Hortense Zulauf', isSelected: false, isClosed: false,
        childList: [
          {
            id: 1, parent_id: 1, value: 'child 1', isSelected: false
          },
          {
            id: 2, parent_id: 1, value: 'child 2', isSelected: false
          }
        ]
      }
    ];
  }

  //Click event on parent checkbox
  parentCheck(parentObj: { childList: string | any[]; isSelected: any; }) {
    for (var i = 0; i < parentObj.childList.length; i++) {
      parentObj.childList[i].isSelected = parentObj.isSelected;
    }
  }

  //Click event on child checkbox
  childCheck(parentObj: { isSelected: any; }, childObj: any[]) {
    parentObj.isSelected = childObj.every(function (itemChild: any) {
      return itemChild.isSelected == true;
    })
  }

  //Click event on master select
  selectUnselectAll(obj: { isAllSelected: boolean; ParentChildchecklist: string | any[]; }) {
    obj.isAllSelected = !obj.isAllSelected;
    for (var i = 0; i < obj.ParentChildchecklist.length; i++) {
      obj.ParentChildchecklist[i].isSelected = obj.isAllSelected;
      for (var j = 0; j < obj.ParentChildchecklist[i].childList.length; j++) {
        obj.ParentChildchecklist[i].childList[j].isSelected = obj.isAllSelected;
      }
    }
  }

  //Expand/Collapse event on each parent
  expandCollapse(obj: { isClosed: boolean; }) {
    obj.isClosed = !obj.isClosed;
  }

  //Master expand/ collapse event
  expandCollapseAll(obj: { ParentChildchecklist: string | any[]; isAllCollapsed: boolean; }) {
    for (var i = 0; i < obj.ParentChildchecklist.length; i++) {
      obj.ParentChildchecklist[i].isClosed = !obj.isAllCollapsed;
    }
    obj.isAllCollapsed = !obj.isAllCollapsed;
  }

  //Just to show updated JSON object on view
  stringify(obj: any) {
    return JSON.stringify(obj);
  }
}
