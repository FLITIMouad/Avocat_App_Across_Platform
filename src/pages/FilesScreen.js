import {
  DetailsView,
  FileManagerComponent,
  Inject,
  NavigationPane,
  Toolbar,
} from "@syncfusion/ej2-react-filemanager";
import { useState } from "react";
import "../assets/scss/FilesScreen.scss";

const FilesScreen = () => {
  const [hostUrl, setHostUrl] = useState(
    "http://localhost:5000"
    //"https://ej2-aspcore-service.azurewebsites.net/"
  );
  return (
    <>
      <div className="control-section">
        <FileManagerComponent
          id="file"
          ajaxSettings={{
            url: hostUrl +"/api/files/view"
              //"api/FileManager/FileOperations"
             ,
            downloadUrl: hostUrl + "api/FileManager/Download",
            uploadUrl: hostUrl + "api/FileManager/Upload",
            getImageUrl: hostUrl + "api/FileManager/GetImage",
          }}
        >
          <Inject services={[NavigationPane, DetailsView, Toolbar]} />
        </FileManagerComponent>
      </div>
    </>
  );
};

export default FilesScreen;
