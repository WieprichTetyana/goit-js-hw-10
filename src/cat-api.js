import axios from "axios";

const BASE_URL = `https://api.thecatapi.com`;

axios.defaults.headers.common['x-api-key'] = 'live_MCb9iAONnZcXEo6zT2WkIWBTOicK5VHKHxvlumk7cG7eSI35K0ferPCipewHobM2';

export function fetchBreeds() {
  const endPoint = `/v1/breeds/`;
  const url = `${BASE_URL}${endPoint}`;
  
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching breeds:", error);
      throw new Error("Oops! Something went wrong! Try reloading the page!");
    });
}
     
export function fetchCatByBreed(breedId) {
  
  const endPoint = `/v1/images/search/`;
  const params = `breed_ids=${breedId}`;
  const url = `${BASE_URL}${endPoint}?${params}`;
  
  
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching breeds:", error);
      throw new Error("Oops! Something went wrong! Try reloading the page!");
    });
}
