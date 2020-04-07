const textarea = document.createElement('textarea');
textarea.className = 'textarea_content';
document.body.append(textarea);
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
document.body.append(keyboard);
const lang = document.createElement('p');
lang.className = 'language';
document.body.append(lang);
lang.innerHTML = 'Создано на Windows ОС ';
const keysEnLower = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'Enter', '\\',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&uarr;',
  'Control', 'Meta', 'Alt', 'space', 'Alt', '&larr;', '&darr;', '&rarr;',
];
const keysRuLower = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', '\\',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&uarr;',
  'Control', 'Meta', 'Alt', 'space', 'Alt', '&larr;', '&darr;', '&rarr;',
];
function init(isEng) {
  let langkeys;
  isEng === 1 ? langkeys = keysEnLower : langkeys = keysRuLower;
  let out = '';
  for (let i = 0; i < langkeys.length; i += 1) {
    if (i === 14 || i === 27 || i === 41 || i === 53) {
      out += '<div class="clear"></div>';
    }
    out += `<div class="k-key" data='${langkeys[i]}'>${langkeys[i]}</div>`;
  }
  keyboard.innerHTML = out;
  document.querySelectorAll('.k-key').forEach((key) => {
    if (key.textContent === 'space') {
      key.classList.add('space');
    } else if (key.textContent === 'Shift' || key.textContent === 'Backspace' || key.textContent === 'Tab' || key.textContent === 'Enter' || key.textContent === 'CapsLock' || key.textContent === 'Control' || key.textContent === 'Meta') {
      key.classList.add('special');
    }
  });
}
document.onload = init();

document.onkeydown = function (event) {
  console.log(event.key);
  document.querySelectorAll('.k-key').forEach((el) => {
    el.classList.remove('active');
  }); if (event.key === 'Space') {
    document.querySelector('.k-key[data="space"]').classList.add('active');
    textarea.value += ' ';
    event.preventDefault();
  } else if (event.key === 'CapsLock') {
    document.querySelector('.k-key[data="CapsLock"]').classList.toggle('activec');
  } else if (event.key === '\\') {
    textarea.value += '\\';
  } else {
    document.querySelector(`.k-key[data='${event.key}']`).classList.add('active');
    if (event.key === 'Tab') {
      event.preventDefault();
      const s = textarea.selectionStart;
      textarea.value = `${textarea.value.substring(0, textarea.selectionStart)}\t${textarea.value.substring(textarea.selectionEnd)}`;
      textarea.selectionEnd = s + 1;
    }
    if (event.key === 'Backspace') {
      textarea.value = textarea.value.slice(0, -1);
    }
    if (event.key === 'Enter') {
      textarea.value += '\n';
    }
    if (event.key === 'Control') {
      isEng = 1;
      init(isEng);
    } else if (event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt' && event.key !== 'Tab' && event.key !== 'Meta' && event.key !== 'Backspace' && event.key !== 'Enter') {
      textarea.value += event.key;
    }
  }
};
document.onkeyup = function () {
  document.querySelectorAll('.k-key').forEach((el) => {
    el.classList.remove('active');
  });
};
document.querySelectorAll('.keyboard .k-key').forEach((el) => {
  el.onmouseup = function (event) {
    const i = el.getAttribute('data');
    el.classList.remove('active');
    if (i === 'Tab') {
      event.preventDefault();
      const s = textarea.selectionStart;
      textarea.value = `${textarea.value.substring(0, textarea.selectionStart)}\t${textarea.value.substring(textarea.selectionEnd)}`;
      textarea.selectionEnd = s + 1;
    } else if (i === 'Backspace') {
      textarea.value = textarea.value.slice(0, -1);
    } else if (i === 'Enter') {
      textarea.value += '\n';
    } else if (i === 'space') {
      textarea.value += ' ';
    }
  };
  el.onmousedown = function (event) {
    const i = el.getAttribute('data');
    el.classList.add('active');
    if (i === 'Tab' || i === 'Alt' || i === 'Shift' || i === 'Control' || i === 'Backspace' || i === 'CapsLock' || i === 'Enter' || i === 'Meta' || i === 'space') {
      event.preventDefault();
    } else {
      textarea.value += i;
    }
  };
});
