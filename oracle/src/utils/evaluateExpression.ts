type Params = { [key: string]: any };

function evaluateExpression(params: Params, expression: string): boolean {
  // Crée une chaîne de caractères représentant les paramètres sous forme de variables locales
  const paramEntries = Object.entries(params).map(([key, value]) => {
    // Si la valeur est une chaîne de caractères, ajoutez des guillemets
    if (typeof value === "string") {
      return `var ${key} = "${value}";`;
    }
    return `var ${key} = ${value};`;
  });

  console.log(paramEntries);

  // Joignez les déclarations de paramètres et l'expression en une seule chaîne
  const functionBody = `
        ${paramEntries.join("\n")}
        return ${expression};
    `;

  console.log(functionBody);

  // Crée et exécute la fonction
  try {
    const func = new Function(functionBody);
    return func();
  } catch (error) {
    console.error("Error evaluating expression:", error);
    return false;
  }
}

export default evaluateExpression;
