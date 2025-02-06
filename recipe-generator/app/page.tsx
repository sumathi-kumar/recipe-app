"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2, UtensilsCrossed, Clock, Star, Users } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import confetti from "canvas-confetti"
import { getRecipeImage } from "@/utils/recipeUtils"

// Fake data generation function
const generateFakeRecipe = (ingredients: string) => {
  const recipes = [
    {
      name: "Creamy Pasta Primavera",
      subtitle: "With fresh vegetables and herbs",
      ingredients: [
        "200g pasta",
        "1 cup mixed vegetables (carrots, peas, bell peppers)",
        "2 cloves garlic, minced",
        "1/4 cup heavy cream",
        "2 tbsp olive oil",
        "Salt and pepper to taste",
        "Fresh basil for garnish",
      ],
      instructions: [
        "Cook pasta according to package instructions. Reserve 1/2 cup of pasta water.",
        "In a large pan, sauté garlic in olive oil over medium heat for 1 minute.",
        "Add mixed vegetables and cook for 3-4 minutes until tender-crisp.",
        "Add cooked pasta, heavy cream, and a splash of pasta water. Toss to combine.",
        "Season with salt and pepper. If needed, add more pasta water for desired consistency.",
        "Garnish with fresh basil before serving.",
      ],
      servings: 2,
      time: "20 minutes",
    },
    {
      name: "Spicy Chicken Stir-Fry",
      subtitle: "With a zesty ginger-soy sauce",
      ingredients: [
        "300g chicken breast, sliced",
        "1 cup mixed vegetables (broccoli, carrots, snap peas)",
        "2 tbsp vegetable oil",
        "2 cloves garlic, minced",
        "1 tbsp grated ginger",
        "3 tbsp soy sauce",
        "1 tbsp sriracha sauce",
        "2 green onions, sliced",
      ],
      instructions: [
        "In a small bowl, mix soy sauce and sriracha. Set aside.",
        "Heat oil in a wok or large skillet over high heat.",
        "Add chicken and stir-fry for 3-4 minutes until nearly cooked through.",
        "Add garlic and ginger, stir-fry for 30 seconds until fragrant.",
        "Add mixed vegetables and stir-fry for 2-3 minutes until tender-crisp.",
        "Pour in the sauce and toss everything together for 1-2 minutes.",
        "Garnish with sliced green onions before serving.",
      ],
      servings: 2,
      time: "25 minutes",
    },
  ]

  // Randomly select one of the recipes
  const selectedRecipe = recipes[Math.floor(Math.random() * recipes.length)]

  // Add the user's ingredients to the recipe
  const userIngredients = ingredients.split(",").map((item) => item.trim())
  selectedRecipe.ingredients = [...selectedRecipe.ingredients, ...userIngredients]

  return selectedRecipe
}

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("")
  const [recipe, setRecipe] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient")
      return
    }

    setError(null)
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      try {
        const generatedRecipe = generateFakeRecipe(ingredients)
        setRecipe(generatedRecipe)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      } catch (err) {
        setError("An error occurred while generating the recipe. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }, 1500)
  }

  useEffect(() => {
    if (recipe) {
      const recipeCard = document.getElementById("recipe-card")
      if (recipeCard) {
        recipeCard.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [recipe])

  return (
    <div className="container mx-auto p-4 min-h-screen bg-background text-foreground">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-center mb-8 pt-12">
        <h1 className="text-3xl font-bold mb-2">Recipe Generator</h1>
        <p className="text-muted-foreground">Enter your ingredients to see the recipe. </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (comma-separated) Ex. Pasta or Chicken "
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UtensilsCrossed className="mr-2 h-4 w-4" />
            )}
            Generate Recipe
          </Button>
        </div>
      </form>

      {error && <div className="text-red-500 dark:text-red-400 text-center mb-4">{error}</div>}

      {recipe && (
        <Card
          id="recipe-card"
          className="w-full max-w-2xl mx-auto overflow-hidden bg-card text-card-foreground rounded-3xl shadow-lg"
        >
          <div className="relative h-48 sm:h-64 bg-muted">
            <img
              src={getRecipeImage(recipe) || "/placeholder.svg"}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl mb-1" style={{ fontFamily: "cursive" }}>
                  {recipe.name}
                </h1>
                <p className="text-muted-foreground italic">{recipe.subtitle}</p>
              </div>
              <div className="flex gap-1 mt-2 sm:mt-0">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? "fill-current text-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-6 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{recipe.time}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h2 className="font-serif text-lg mb-4 uppercase tracking-wider">Ingredients</h2>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  {recipe.ingredients.map((ingredient: string, i: number) => (
                    <li key={i} className="flex items-baseline gap-2">
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-lg mb-4 uppercase tracking-wider">Directions</h2>
                <ol className="space-y-4 text-muted-foreground list-decimal list-outside ml-5">
                  {recipe.instructions.map((step: string, i: number) => (
                    <li key={i} className="pl-2">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

