import { RecipeInput } from "@/types/types";
import getToken from "@/utils/Token";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getRecipes = async (page: number = 0, size: number = 10) => {
  const response = await fetch(
    `${API_URL}/recipes?page=${page}&size=${size}&sortBy=createdAt&direction=DESC`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    },
  );
  console.log(response);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const getRecipeById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Could not fetch recipe by id: " + error);
  }
};

const searchRecipes = async (
  page: number = 0,
  size: number = 10,
  searchQuery: string,
) => {
  try {
    const response = await fetch(
      `${API_URL}/recipes/search?page=${page}&size=${size}&sortBy=createdAt&direction=DESC`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getToken()),
        },
        body: JSON.stringify({ title: searchQuery }),
      },
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (e) {
    console.error("Error fetching searched recipes: " + e);
  }
};

const addRecipe = async (recipeInput: RecipeInput, imageURI: string) => {
  try {
    const formData = new FormData();

    formData.append("recipe", {
      string: JSON.stringify(recipeInput),
      type: "application/json",
    } as any);

    // Prepare file object
    const filename = imageURI.split("/").pop() || "image.jpg";
    const ext = filename.split(".").pop();
    const mimeType = `image/${ext}`;

    formData.append("file", {
      uri: imageURI,
      name: filename,
      type: mimeType,
    } as any);

    const response = await fetch(`${API_URL}/recipes`, {
      method: "POST",
      headers: { Authorization: "Bearer " + (await getToken()) },
      body: formData,
    });

    return response;
  } catch (e) {
    console.error("Error creating a recipe: " + e);
  }
};

const checkFavorite = async(id: string) => {
  try {
    const response = await fetch(`${API_URL}/recipes/checkfavorite/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Could not check if favorite recipe by id: " + error);
  }
}

const favoriteARecipe = async(id: string) => {
  try {
    const response = await fetch(`${API_URL}/recipes/favorite/${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    return response
  } catch (error) {
    console.error("Could not favorite recipe by id: " + error);
  }
}

const unFavoriteARecipe = async(id: string) => {
  try {
    const response = await fetch(`${API_URL}/recipes/unfavorite/${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    return response
  } catch (error) {
    console.error("Could not unfavorite recipe by id: " + error);
  }
}

export default {
  getRecipes,
  getRecipeById,
  searchRecipes,
  addRecipe,
  checkFavorite,
  favoriteARecipe,
  unFavoriteARecipe
};
