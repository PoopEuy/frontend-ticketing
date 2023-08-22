export function sortData(data, sortedProp, sortValueObj) {
  const sortedData = [...data];
  const { prop, order } = sortedProp;
  const sortMultiplier = order === "asc" ? 1 : -1;
  const sortFn =
    sortValueObj === null || sortValueObj === undefined
      ? undefined
      : sortValueObj[prop];
  sortedData.sort((a, b) => {
    let quantifiedValue1 = a[prop];
    let quantifiedValue2 = b[prop];
    if (sortFn) {
      quantifiedValue1 = sortFn(quantifiedValue1);
      quantifiedValue2 = sortFn(quantifiedValue2);
    }

    if (quantifiedValue1 < quantifiedValue2) {
      return -1 * sortMultiplier;
    } else if (quantifiedValue1 > quantifiedValue2) {
      return 1 * sortMultiplier;
    }
    return 0;
  });
  console.log(sortedData[0].name);
  return sortedData;
}

export function filterData(data, headers, filterText) {
  if (filterText === "") {
    return data;
  }
  const lowercased = filterText.toLowerCase();
  return data.filter((element) => {
    let isElementIncluded = false;
    let i = 0;
    const elementProps = Object.keys(element);
    const elementPropLength = elementProps.length;
    while (!isElementIncluded && i < elementPropLength) {
      const prop = elementProps[i];
      if (headers[prop].isFilterable) {
        let columnValue = element[prop];
        if (typeof columnValue !== "string") {
          // Convert to string if it is not a string.
          columnValue = columnValue.toString();
        }
        columnValue = columnValue.toLowerCase();
        isElementIncluded = columnValue.includes(lowercased);
        if (isElementIncluded) {
          break;
        }
      }
      i += 1;
    }
    return isElementIncluded;
  });
}

export function paginateData(data, currentPage, rowsPerPage) {
  let paginatedData = [...data];
  if (rowsPerPage !== undefined) {
    const startRow = (currentPage - 1) * rowsPerPage;
    const endRow = currentPage * rowsPerPage;
    paginatedData = data.slice(startRow, endRow);
  }
  return paginatedData;
}
