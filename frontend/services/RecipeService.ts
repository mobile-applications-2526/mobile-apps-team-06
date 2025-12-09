import getToken from "@/utils/Token"

const API_URL = process.env.EXPO_PUBLIC_API_URL

const getRecipes = async(page: number = 0, size: number = 10) => {
    const response = await fetch(
      `${API_URL}/recipes?page=${page}&size=${size}&sortBy=createdAt&direction=DESC`
      ,{
        method: "GET",
        headers: {
            "Authorization": "Bearer " + await getToken()
        }
      });
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
}

const searchRecipes = async(page: number = 0, size: number = 10, searchQuery: string) => {
    try {
      const response = await fetch(`${API_URL}/recipes/search?page=${page}&size=${size}&sortBy=createdAt&direction=DESC`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + await getToken()
      },
      body: JSON.stringify({title: searchQuery})
    })
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
    } catch (e) {
      console.error("Error fetching searched recipes: " + e)
    };
  }


export default {
  getRecipes,
  searchRecipes,
}