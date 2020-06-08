const { app, Menu, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;
function createWindow() {
  win = new BrowserWindow({ width: 1000, height: 1000, frame: true, fullscreen: false, webPreferences: {
    webSecurity: false
  }});
  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // The following is optional and will open the DevTools:
  win.webContents.openDevTools()
  win.on("closed", () => {
    win = null;
  });

  Menu.setApplicationMenu(null)
}
app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});