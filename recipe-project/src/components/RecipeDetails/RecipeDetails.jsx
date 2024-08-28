import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as recipeService from '../../services/recipeService.js'
import { AuthedUserContext } from '../../App.jsx'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./RecipeDetails.scss"


const RecipeDetails = ({ handleDeleteRecipe}) => {
 // Context
 const user = useContext(AuthedUserContext)


 // State
 const [recipe, setRecipe] = useState(null)


 // Location variables
 const { recipeId } = useParams()


 useEffect(() => {
   const fetchRecipe = async () => {
     const singleRecipe = await recipeService.show(recipeId)
     setRecipe(singleRecipe)
   }
   fetchRecipe()
 }, [recipeId])

  
 return (

   <main className="recipedetails">
    <Container className="containerrecipe">
      <Row>
      <Col xs="12" className="showtitle">
       <h1>{recipe.recipeName}</h1>
       </Col>
       </Row>
       <Row>
       <Col xs="12">
       <p>
        posted by {recipe.user.username}
       </p>


     {recipe.image && (
      <div className="upload-image" style={{backgroundImage: `url(${recipe.image})`}}> </div>)}
     <p className= "description-card">{recipe.description}</p>
</Col>
</Row>
<Row className="commentsrow">
<Col className= "commentsall">

     </Col>
</Row>
<Row>
       { recipe.user._id === user._id &&
       <section>
         <button onClick={() => handleDeleteRecipe(recipeId)}>Delete Recipe</button>
         <Link to={`/recipes/${recipeId}/edit`}>Update Recipe</Link>
       </section>
     }
</Row>
</Container>
</main>
 
 )
}

export default RecipeDetails

