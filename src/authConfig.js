import { LogLevel } from "@azure/msal-browser"
export const msalConfig = {
  auth: {
    clientId: "a5462b57-a249-4778-9732-871eee3b4223",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: { cacheLocation: "localStorage", storeAuthStateInCookie: false },
  system: {
    allowRedirectInIframe: true,
    loggerOptions: {
      loggerCallback: (level, message, containesPII) => {
        if (containesPII) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
        }
      },
      logLevel: "Info",
    },
  },
}
export const loginRequest = { scopes: ["User.Read"] }
export const graphConfig = { graphMeEndpoint: "https://graph.microsoft.com" }

;
