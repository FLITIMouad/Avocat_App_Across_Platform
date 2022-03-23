const  { ipcRenderer } =window.require("electron");
const TitleBar = () => {
  const MaxWindow = () => {
    ipcRenderer.send("Maximize");
  };
  const Minimize = () => {
    ipcRenderer.send("Minimize");
  };
  const Close = () => {
    ipcRenderer.send("Close");
  };
  return (
    <>
      <div className="header">
        <div className="leftSide">
          <div className="logo">
            <i className="fas fa-balance-scale"></i>
          </div>
          <div className="title">تطبيق المحاماة</div>
        </div>
        <div className="rightSide">
          <button onClick={Minimize} className="MinButton">
            <i className="fas fa-minus"></i>
          </button>
          <button onClick={MaxWindow} className="MaxButton">
            <i className="far fa-window-restore"></i>
          </button>
          <button onClick={Close} className="CloseButton">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default TitleBar;
