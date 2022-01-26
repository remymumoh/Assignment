import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'restaurant-menu';
  data: any;

  constructor() {
    this.data = {};
    this.data.isAllSelected = false;
    this.data.isAllCollapsed = false;

    this.data.ParentChildchecklist = [
      {
        name: 'Salad',
        choices: [
          { name: 'Santa Fe' },
          { name: 'Greek' },
          { name: 'Asian' },
        ],
        related: [
          {
            name: 'Dressing',
            choices: [
              { name: 'Italian' },
              { name: 'Blue Cheese' },
              { name: 'Ranch' },
            ]
          },
          {
            name: 'Bread',
            choices: [
              { name: 'Italian' },
              { name: 'Flat' },
              { name: 'Sourdough' },
            ]
          }
        ]
      },
      {
        name: 'Entree',
        choices: [
          { name: 'Steak' },
          { name: 'Salmon' },
          { name: 'Rice' },
        ],
        related: [
        ]
      },
      {
        name: 'Soup',
        choices: [
          { name: 'Minestrone' },
          { name: 'Hot and sour' },
          { name: 'Miso' },
        ],
        related: [
          {
            name: 'Bread',
            choices: [
              { name: 'Breadsticks'}
            ]
          }
        ]
      }
    ];
  }

  // Click event on parent checkbox
  parentCheck(parentObj) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < parentObj.choices.length; i++) {
      parentObj.choices[i].isSelected = parentObj.isSelected;
    }
  }

  // Click event on child checkbox
  childCheck(parentObj, childObj) {
    // tslint:disable-next-line:only-arrow-functions
    parentObj.isSelected = childObj.every(function(itemChild: any) {
      // tslint:disable-next-line:triple-equals
      return !(itemChild.isSelected != true);
    });
  }

  // Click event on master select
  selectUnselectAll(obj) {
    obj.isAllSelected = !obj.isAllSelected;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < obj.ParentChildchecklist.length; i++) {
      obj.ParentChildchecklist[i].isSelected = obj.isAllSelected;
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < obj.ParentChildchecklist[i].choices.length; j++) {
        obj.ParentChildchecklist[i].choices[j].isSelected = obj.isAllSelected;
      }
    }
  }

  // Expand/Collapse event on each parent
  expandCollapse(obj) {
    obj.isClosed = !obj.isClosed;
  }

  // Master expand/ collapse event
  expandCollapseAll(obj) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < obj.ParentChildchecklist.length; i++) {
      obj.ParentChildchecklist[i].isClosed = !obj.isAllCollapsed;
    }
    obj.isAllCollapsed = !obj.isAllCollapsed;
  }

  // Just to show updated JSON object on view
  stringify(obj) {
    return JSON.stringify(obj);
  }
}
