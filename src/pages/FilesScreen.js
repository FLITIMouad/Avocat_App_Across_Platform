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
  const  beforeSend=(args)=>{
    const {key_f}=JSON.parse(localStorage.getItem("da"))
 console.log("hh")
    args.ajaxSettings.beforeSend =  function (args) {
      //Setting authorization header
      args.httpRequest.setRequestHeader("Authorization", `Bearer ${key_f}`)
    } 
  }
  const [hostUrl, setHostUrl] = useState( "http://localhost:5000/api/files");
  return (
    <>
      <div className="control-section">
        <FileManagerComponent
          id="file"
          ajaxSettings={{
            url: hostUrl,
            downloadUrl: hostUrl + "/Download",
            uploadUrl: hostUrl + "/Upload",
            getImageUrl: hostUrl + "/GetImage",

          }}
          beforeSend={beforeSend}
          view="LargeIcons" enablePersistence={true}
        >
          <Inject services={[NavigationPane, DetailsView, Toolbar]} />
        </FileManagerComponent>
      </div>
    </>
  );
};

export default FilesScreen;
