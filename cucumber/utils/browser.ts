import { ClientFunction } from 'testcafe';

export const goBack = (t: TestController): Promise<void> => ClientFunction(() => window.history.back()).with({ boundTestRun: t })();

export const getLocation = (t: TestController): Promise<string> => ClientFunction(() => window.location.href).with({ boundTestRun: t })();

export const localStorageSet = (t: TestController, key: string, val: string): Promise<void> =>
  ClientFunction((k, v) => localStorage.setItem(k, v)).with({ boundTestRun: t })(key, val);

export const localStorageGet = (t: TestController, key: string): Promise<string | null> =>
  ClientFunction(k => localStorage.getItem(k)).with({ boundTestRun: t })(key);


  export const clearLocalStorage = (t: TestController): Promise<void> =>
  ClientFunction(() => localStorage.clear()).with({ boundTestRun: t })();

export const clearCookies = (t: TestController): Promise<void> => ClientFunction(() => {
  const cookies = document.cookie.split("; ");
  for (let c = 0; c < cookies.length; c++) {
    const d = window.location.hostname.split(".");
    while (d.length > 0) {
      const cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
      const p = window.location.pathname.split('/');
      document.cookie = cookieBase + '/';
      while (p.length > 0) {
        document.cookie = cookieBase + p.join('/');
        p.pop();
      }
      d.shift();
    }
  }
}).with({ boundTestRun: t })();