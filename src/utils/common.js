export function changeText(prev, news) {
  const elements = document.querySelectorAll(
    ".Polaris-BulkActions__BulkActionButton span.Polaris-Button__Text"
  );

  if (elements.length > 0) {
    elements.forEach((el) => {
      const text = el.textContent;
      if (text === prev) {
        el.textContent = news;
      }
    });
  }
}

export function dateRangeChecker(dateObj, check) {
  var from = new Date(dateObj.start);
  var to = new Date(dateObj.end);
  to.setDate(to.getDate() + 1);

  return check.toDate() >= from && check.toDate() <= to;
}
