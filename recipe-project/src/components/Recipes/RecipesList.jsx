import { Link } from 'react-router-dom'
import './RecipesList.scss'


const RecipesList = ({ recipes }) => {
 console.log(recipes)




 return (
   <main className="recipes-list">
     {recipes.map((recipe) => (
       <Link key={recipe._id} to={`/recipes/${recipe._id}`} className="recipe-card-link">
         <article className="recipe-card">
           <header>
             <h2>{recipe.recipeName}</h2>
             <p>
               {recipe.user.username} posted on{' '}
               {new Date(recipe.createdAt).toLocaleDateString()}
             </p>
           </header>
           <p>{recipe.description}</p>
         </article>
       </Link>
     ))}
   </main>
 )
}


export default RecipesList