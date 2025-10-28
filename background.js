'use strict';

const defaultConfig = {
  today: {
    active: true,
    activeBG: false,
    activeBorder: true,
    accent: '#1a73e8',
    darkAccent: '#8ab4f8',
    background: '#ffffff',
    darkBackground: '#3c4043',
    borderColor: '#1a73e8',
    darkBorderColor: '#8ab4f8',
  },
  color: [
    '#d50000', '#333333', '#333333', '#333333', '#333333', '#333333', '#0b8043',
  ],
  darkColor: [
    '#f28b82', '#bdc1c6', '#bdc1c6', '#bdc1c6', '#bdc1c6', '#bdc1c6', '#81c995',
  ],
  background: [
    '#fce8e6', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#e6f4ea',
  ],
  darkBackground: [
    '#5c2b29', '#3c4043', '#3c4043', '#3c4043', '#3c4043', '#3c4043', '#283c33',
  ],
};

const defaultHolidays = {
  active: true,
  color: '#d50000',
  darkColor: '#f28b82',
  background: '#ffffff',
  darkBackground: '#3c4043',
  from: 'google',
  selectedID: 'ja.japanese#holiday@group.v.calendar.google.com',
  data: null,
  loading: false,
  progress: 0,
};

// Обработчик сообщений от content-script.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    switch (request.command) {
      // Получение сохраненных данных
      case 'getSaveData': {
        const result = await chrome.storage.local.get(['config', 'holidays']);
        const response = {
          config: result.config || structuredClone(defaultConfig),
          holidays: result.holidays || structuredClone(defaultHolidays),
        };
        sendResponse(response);
        break;
      }
      // Сохранение конфигурации
      case 'saveConfig': {
        await chrome.storage.local.set({ config: request.data });
        sendResponse(true);
        break;
      }
      // Сохранение данных о праздниках
      case 'saveHoliday': {
        await chrome.storage.local.set({ holidays: request.data });
        sendResponse(true);
        break;
      }
      // Сброс настроек
      case 'reset': {
        const response = {
          config: structuredClone(defaultConfig),
          holidays: structuredClone(defaultHolidays),
        };
        await chrome.storage.local.set(response);
        sendResponse(response);
        break;
      }
    }
  })();
  return true;
});

// Обработчик нажатия на иконку расширения
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { command: 'openSetting' });
  }
});
