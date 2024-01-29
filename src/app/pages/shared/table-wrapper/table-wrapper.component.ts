import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
})
export class TableWrapperComponent {

  @Input('header')
  public filterTemplate: TemplateRef<unknown> | null = null;

  @Input('actions')
  public actionsTemplate: TemplateRef<unknown> | null = null;
  @Input() noHeader = false;
}