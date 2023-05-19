import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';

export const Popup = (type, title, text, onPress) => {
  return new Promise(resolve => {
    Dialog.show({
      type:
        type === 'success'
          ? ALERT_TYPE?.SUCCESS
          : type === 'error'
          ? ALERT_TYPE?.DANGER
          : ALERT_TYPE?.WARNING,
      title: title,
      textBody: text,
      button: 'close',
      onHide: () => {
        resolve();
        if (typeof onPress === 'function') {
          onPress();
        }
      },
    });
  });
};

export const missingInputPopup = value => {
  Popup(
    (type = 'warning'),
    (title = 'Warning'),
    (textBody = `Please enter your ${value}`),
  );
};

export const notification = (type, title, text, close) => {
  return new Promise(resolve => {
    Toast.show({
      type:
        type === 'success'
          ? ALERT_TYPE?.SUCCESS
          : type === 'error'
          ? ALERT_TYPE?.DANGER
          : ALERT_TYPE?.WARNING,
      title: title,
      textBody: text,
      autoClose: close ? close : 2000,
      onHide: () => {
        resolve();
        if (typeof onPress === 'function') {
          onPress();
        }
      },
    });
  });
};
