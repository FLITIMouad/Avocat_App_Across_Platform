const path = require("path");

const { app, BrowserWindow, ipcMain } = require("electron");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  // win.loadURL( `file://${path.join(__dirname, "../build/index.html")}`
  win.loadURL(`http://localhost:3000`);
  // Open the DevTools.

  ipcMain.on("Minimize", () => {
    win.minimize();
    console.log("Minimize");
  });
  ipcMain.on("Maximize", () => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
    console.log("Maximize");
  });
  ipcMain.on("Close", () => {
    win.close();
    console.log("Close");
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
