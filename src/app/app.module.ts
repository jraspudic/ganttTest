import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { GanttModule } from "@syncfusion/ej2-angular-gantt";
import { AppComponent } from "./app.component";
import {
  ToolbarService,
  EditService,
  SelectionService,
} from "@syncfusion/ej2-angular-gantt";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GanttModule, HttpClientModule],
  providers: [ToolbarService, EditService, SelectionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
