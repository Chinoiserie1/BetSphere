function evaluateStringExpression(key: string, expression: string): boolean {
  // Fonction pour évaluer les expressions simples
  const evalSimpleExpression = (exp: string): boolean => {
    if (exp === "true") return true;
    exp = exp.trim();
    if (exp.includes("==")) {
      const [left, right] = exp
        .split("==")
        .map((part) => part.trim().replace(/"/g, ""));
      return left === right;
    } else if (exp.includes("!=")) {
      const [left, right] = exp
        .split("!=")
        .map((part) => part.trim().replace(/"/g, ""));
      return left !== right;
    } else {
      return false;
    }
  };

  // Évaluer les conditions entre parenthèses
  while (expression.includes("(")) {
    const start = expression.lastIndexOf("(");
    const end = expression.indexOf(")", start);
    const subExpr = expression.substring(start + 1, end);
    const result = evaluateStringExpression(key, subExpr);
    expression =
      expression.substring(0, start) + result + expression.substring(end + 1);
  }

  // Remplacer 'key' par la valeur réelle entre guillemets
  expression = expression.replace(/key/g, `"${key}"`);

  // Évaluer les opérations AND (&&) en premier
  while (expression.includes("&&")) {
    const parts = expression.split("&&");
    const result = parts.every((part) =>
      evaluateStringExpression(key, part.trim())
    );
    expression = result.toString();
  }

  // Évaluer les opérations OR (||) ensuite
  while (expression.includes("||")) {
    const parts = expression.split("||");
    const result = parts.some((part) =>
      evaluateStringExpression(key, part.trim())
    );
    expression = result.toString();
  }

  // Finalement, évaluer les comparaisons simples
  try {
    // console.log(expression);
    return evalSimpleExpression(expression);
  } catch {
    return false;
  }
}

function evaluateNumberExpression(key: number, expression: string): boolean {
  // Évaluer les conditions entre parenthèses
  while (expression.includes("(")) {
    const start = expression.lastIndexOf("(");
    const end = expression.indexOf(")", start);
    const subExpr = expression.substring(start + 1, end);
    const result = evaluateNumberExpression(key, subExpr);
    expression =
      expression.substring(0, start) + result + expression.substring(end + 1);
  }

  // Remplacer 'key' par la valeur réelle
  expression = expression.replace(/key/g, key.toString());

  // Évaluer les opérations AND (&&) en premier
  while (expression.includes("&&")) {
    const parts = expression.split("&&");
    const result = parts.every((part) =>
      evaluateNumberExpression(key, part.trim())
    );
    expression = result.toString();
  }

  // Évaluer les opérations OR (||) ensuite
  while (expression.includes("||")) {
    const parts = expression.split("||");
    const result = parts.some((part) =>
      evaluateNumberExpression(key, part.trim())
    );
    expression = result.toString();
  }

  // Finalement, évaluer les comparaisons simples
  try {
    return eval(expression);
  } catch {
    return false;
  }
}

const isNumber = (str: string): boolean => {
  return !isNaN(Number(str));
};

const evaluateExpression = (
  key: any,
  expression: string
): boolean | undefined => {
  if (isNumber(key)) {
    return evaluateNumberExpression(key, expression);
  } else {
    return evaluateStringExpression(
      key.toLowerCase(),
      expression.toLowerCase()
    );
  }
};

export default evaluateExpression;
