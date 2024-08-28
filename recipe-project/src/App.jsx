import { useState, useEffect, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import RecipeDetails from './components/RecipeDetails/RecipeDetails.jsx'
import SignupForm from './components/SignupForm/SignupForm.jsx'
import SigninForm from './components/SigninForm/SigninForm.jsx'
import Landing from './components/Landing/Landing.jsx'
import RecipesList from './components/Recipes/RecipesList.jsx'
import RecipesForm from './components/Recipes/RecipesForm.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


// Services
import * as recipeService from './services/recipeService.js'
import * as authService from './services/authService.js'

export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(authService.getUser()) // using the method from authservice
  const [recipes, setRecipes] = useState([])

  // Location variables
  const navigate = useNavigate()

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  const fetchAllRecipes = async () => {
    const allRecipes = await recipeService.index() // Make the API call, receive the data back from the backend server
    setRecipes(allRecipes) // Set the data to state
  }

  useEffect(() => {
    if (user) {
      fetchAllRecipes()
    }
  }, [user])

  const handleAddRecipe = async (formData) => {
    const newRecipe = await recipeService.create(formData)
    setRecipes([newRecipe, ...recipes])
    navigate('/recipes')
  }

  const handleDeleteRecipe = async (recipeId) => {
    // Send the DELETE request via our service function
    const deleteRecipe = await recipeService.deleteRecipe(recipeId)
    console.log(deleteRecipe)
    // Update state to reflect the up to date recipes list
    await fetchAllRecipes()
    // Navigate to recipe index
    navigate('/recipes')
  }

  const handleUpdateRecipe = async (recipeId, formData) => {
    const updatedRecipe = await recipeService.update(recipeId, formData)
    console.log(updatedRecipe)
    navigate(`/recipes/${recipeId}`)
  }

  return (
    <AuthedUserContext.Provider value={user}>
      {user ? (
        <Container>
          <Row>
            <Col xs={{ span: 2 }}>
              <NavBar user={user} handleSignout={handleSignout} />
            </Col>
            <Col xs={{ span: 9, offset: 1 }}>
              <Routes>
                <Route path="/recipes" element={<RecipesList recipes={recipes} />} />
                <Route path="/recipes/new" element={<RecipesForm handleAddRecipe={handleAddRecipe} />} />
                <Route path="/recipes/recipeId" element={<RecipeDetails handleDeleteRecipe={handleDeleteRecipe} />} />
                <Route path="/recipes/:recipeId/edit" element={<RecipesForm handleUpdateRecipe={handleUpdateRecipe} />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Container>
            <Row>
              <Col xs={{ span: 4, offset: 1 }}>
                <NavBar user={user} handleSignout={handleSignout} />
              </Col>
              <Col xs={{ span: 6 }}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="signup" element={<SignupForm setUser={setUser} />} />
                  <Route path="signin" element={<SigninForm setUser={setUser} />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </AuthedUserContext.Provider>
  )
}

export default App