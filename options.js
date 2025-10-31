document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cycle-form');
  const cycleLengthInput = document.getElementById('cycle-length');
  const periodLengthInput = document.getElementById('period-length');
  const startDateInput = document.getElementById('start-date');

  // Load saved data
  chrome.storage.local.get('config', (result) => {
    if (result.config && result.config.menstrualCycle) {
      const { cycleLength, periodLength, startDate } = result.config.menstrualCycle;
      cycleLengthInput.value = cycleLength;
      periodLengthInput.value = periodLength;
      startDateInput.value = startDate;
    }
  });

  // Save data on submit
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    chrome.storage.local.get('config', (result) => {
      const config = result.config || {};
      config.menstrualCycle = {
        cycleLength: parseInt(cycleLengthInput.value, 10),
        periodLength: parseInt(periodLengthInput.value, 10),
        startDate: startDateInput.value,
      };
      chrome.storage.local.set({ config }, () => {
        alert('Settings saved!');
      });
    });
  });
});
