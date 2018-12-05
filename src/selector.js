var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ

  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function (selector) {
  if (selector[0] == '#') return 'id'
  if (selector[0] == '.') return 'class'
  if (selector.split('.').length > 1) return 'tag.class'
  return 'tag'
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {

    matchFunction = function (elemento) {
      if (selector.split('#')[1] == elemento.id) return true
      return false
    }

  } else if (selectorType === "class") {
    var selec = selector.split('.')
    matchFunction = function (elemento) {
      var ele = elemento.className.split(' ')
      for (var i = 0; i < ele.length; i++) {
        if (ele[i] == selec[1]) return true
      }
      return false
    }

  } else if (selectorType === "tag.class") {
    var [tag, cla] = selector.split('.')
    matchFunction = function (elemento) {
      var ele = elemento.className.split(' ')
      for (var i = 0; i < ele.length; i++) {
        if (ele[i] == cla && elemento.tagName.toLowerCase() == tag) return true
      }
      return false
    }

  } else if (selectorType === "tag") {
    console.log(selector)
    matchFunction = function (elemento) {
      if (selector == elemento.tagName.toLowerCase()) return true
      return false
    }

  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
