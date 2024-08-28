import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import * as recipeService from '../../services/recipeService.js'
import './RecipesForm.scss' 

const RecipesForm = ({ handleAddRecipe, handleUpdateRecipe }) => {
  const [formData, setFormData] = useState({
    recipeName: '',
    location: '',
    image: '',
    description: '',
  })

  const { recipeId } = useParams()

  useEffect(() => {
    const fetchRecipe = async () => {
      const singleRecipe = await recipeService.show(recipeId)
      setFormData(singleRecipe)
    }
    if (recipeId) {
      fetchRecipe()
    }
  }, [recipeId])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (recipeId) {
      handleUpdateRecipe(recipeId, formData)
    } else {
      handleAddRecipe(formData)
    }
  }

  return (
    <Container className="recipe-form">
      <h1>{ recipeId ? 'Update Recipe' : 'Create Recipe'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="recipeName-input" className="form-group">
          <Form.Label>Name of Recipe</Form.Label>
          <Form.Control
            required
            type="text"
            name="recipeName"
            value={formData.recipeName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="cook-input" className="form-group">
          <Form.Label>Cook</Form.Label>
          <Form.Control
            required
            type="text"
            name="cook"
            value={formData.cook}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description-input" className="form-group">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="btn-container">
          <Button variant="primary" type="submit">SUBMIT</Button>
        </div>
      </Form>
    </Container>
  )
}

export default RecipesForm
