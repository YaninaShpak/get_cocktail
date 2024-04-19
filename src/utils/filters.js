export const filterCategory = (currentCategory, categoryName, data) => {
  return currentCategory !== categoryName
    ? data.filter(
        (el) => el.Alcoholic.toLowerCase() === currentCategory.toLowerCase()
      )
    : data;
};

export const filterBaseIngredient = (baseIngredient, data) => {
  return (
    data.filter((item) =>
      item.Ingredients.some((el) =>
        el.toLowerCase().includes(baseIngredient.toLowerCase())
      )
    ) ?? data
  );
};

export const filterIncludeIngredients = (includeIngredients, data) => {
  if (includeIngredients.length > 0) {
    return data.filter((obj) =>
    includeIngredients.every((name) =>
        obj.Ingredients.some((fullName) =>
        fullName.toLowerCase().includes(name.toLowerCase())
        )
      )
    );
  }

  return data;
};

export const filterExcludeIngredients = (excludeIngredients, data) => {
  return excludeIngredients.length > 0
    ? data.filter(
        (el) =>
          !el.Ingredients.some((item) =>
            excludeIngredients.some((i) =>
              item.toLowerCase().includes(i.toLowerCase())
            )
          )
      )
    : data;
};

export const search = (searchValue, data) => {
  const findSome = (array) => {
    return array.some((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
  };
  return data.filter(
    (el) =>
      el.Title.toLowerCase().includes(searchValue.toLowerCase()) ||
      findSome(el.Ingredients)
  );
};

export const filterSubCategory = (currentSubCategory, data) => {
  return currentSubCategory === "low alcohol"
    ? data.filter((el) => Number(el.totalStrength) <= 20)
    : currentSubCategory === "strong"
    ? data.filter((el) => Number(el.totalStrength) > 20)
    : data;
};

export const filterTotalStrength = (
  currentCategory,
  valueMin,
  valueMax,
  data
) => {
  return currentCategory === "Alcoholic"
    ? data.filter(
        (el) =>
          Number(el.totalStrength) >= valueMin &&
          Number(el.totalStrength) <= valueMax
      )
    : data;
};
