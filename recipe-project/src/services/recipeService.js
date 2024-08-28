import { getToken } from './authService.js'

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/recipes`

export const index = async () => {
    console.log(BASE_URL)
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return res.json();
    } catch (error) {
        console.log(error)
    }
}


export const show = async (recipeId) => {
    try {
        const res = await fetch(`${BASE_URL}/${recipeId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return res.json();
    } catch (error) {
        console.log(error)
    }
}



export const deleteRecipe = async (recipeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}


export const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export const update = async (recipeId, formData) => {
    try {
        const res = await fetch(`${BASE_URL}/${recipeId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}
