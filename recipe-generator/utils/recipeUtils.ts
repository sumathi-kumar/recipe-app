export function getRecipeImage(recipe: any): string {
  const lowerCaseName = recipe.name.toLowerCase()
  const lowerCaseIngredients = recipe.ingredients.map((i: string) => i.toLowerCase())

  if (lowerCaseName.includes("pasta") || lowerCaseIngredients.includes("pasta")) {
    return "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80"
  } else if (lowerCaseName.includes("chicken") || lowerCaseIngredients.includes("chicken")) {
    return "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"
  } else if (
    lowerCaseName.includes("salad") ||
    lowerCaseIngredients.some((i: string) => i.includes("lettuce") || i.includes("greens"))
  ) {
    return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  } else if (
    lowerCaseName.includes("soup") ||
    lowerCaseIngredients.some((i: string) => i.includes("broth") || i.includes("stock"))
  ) {
    return "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
  } else if (lowerCaseName.includes("stir-fry") || lowerCaseIngredients.includes("wok")) {
    return "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80"
  }

  // Default image if no specific match is found
  return "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80"
}

