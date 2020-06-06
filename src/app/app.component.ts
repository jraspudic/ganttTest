import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DataManager, WebApiAdaptor, UrlAdaptor } from "@syncfusion/ej2-data";
import { EditSettingsModel, ToolbarItem } from "@syncfusion/ej2-angular-gantt";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  public data: DataManager;
  public taskSettings: object;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItem[];
  public columns: object[];
  public timelineSettings: object;
  public gridLines: string;
  public labelSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public ngOnInit(): void {
    this.data = new DataManager({
      url:
        "https://ej2services.syncfusion.com/production/web-services/api/GanttData",
      insertUrl:
        "https://ej2services.syncfusion.com/production/web-services/api/GanttData",
      adaptor: new UrlAdaptor(), //WebApiAdaptor //crudUrl
      crossDomain: true,
    });
    this.taskSettings = {
      id: "TaskId",
      name: "TaskName",
      startDate: "StartDate",
      duration: "Duration",
      progress: "Progress",
      dependency: "Predecessor",
      child: "SubTasks",
    };
    this.columns = [
      {
        field: "TaskName",
        headerText: "Task Name",
        width: "250",
        clipMode: "EllipsisWithTooltip",
      },
      { field: "StartDate" },
      { field: "Duration" },
    ];
    this.timelineSettings = {
      timelineUnitSize: 50,
      topTier: {
        unit: "Month",
        format: "MMM dd, y",
      },
      bottomTier: {
        unit: "Day",
        formatter: (date) => {
          let month: number = date.getMonth();
          if (month == 1) {
            return "";
          } else {
            let presentDate = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            );
            var start = new Date(presentDate.getFullYear(), 0, 0);
            var diff = Number(presentDate) - Number(start);
            var oneDay = 1000 * 60 * 60 * 24;
            var day = Math.floor(diff / oneDay);
            return "day " + (day - 59);
          }
        },
      },
    };
    this.gridLines = "Both";
    this.labelSettings = {
      leftLabel: "TaskName",
    };
    this.projectStartDate = new Date("02/24/2019");
    this.projectEndDate = new Date("06/10/2019");

    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true,
    };
    this.toolbar = [
      "Add",
      "Edit",
      "Update",
      "Delete",
      "Cancel",
      "ExpandAll",
      "CollapseAll",
    ];
  }

  sendPost() {
    this.http.post("nekiUrl/api", "dataString").subscribe(
      (data) => {
        console.log("vraceni data");
      },
      (err) => {
        console.log("Error se desio");
        console.log(err);
      }
    );
  }
}
