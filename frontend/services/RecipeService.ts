import getToken from "@/utils/Token"

const API_URL = process.env.EXPO_PUBLIC_API_URL


export const RecipeService = {
  async getRecipes(page: number = 0, size: number = 10) {
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
};