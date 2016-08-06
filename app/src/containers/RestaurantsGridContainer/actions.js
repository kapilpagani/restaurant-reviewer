import {
  RESTAURANTS_LOADING_INITIATION,
  RESTAURANTS_LOADING_SUCCESS,
  RESTAURANTS_LOADING_FAILURE,
  RESTAURANT_CATEGORIES,
} from './constants';
const baseUrl = `http://0.0.0.0:8080/api/v1/`;
const restaurantUrl = `http://0.0.0.0:8080/api/v1/restaurants`;
import fetch from 'isomorphic-fetch';
const headers = new Headers({
  'content-type': 'application/json',
});
const options = {
  method: 'GET',
  headers,
  mode: 'no-cors',
};

// loadRestaurantsInitiation :: None -> {Action}
const loadRestaurantsInitiation = () => ({
  type: RESTAURANTS_LOADING_INITIATION,
});

// loadRestaurantsSuccess :: [JSON] -> {Action}
const loadRestaurantsSuccess = (restaurants) => ({
  type: RESTAURANTS_LOADING_SUCCESS,
  restaurants,
});


const loadRestaurantCategories = (categories) => ({
  type: RESTAURANT_CATEGORIES,
  categories,
});

// loadRestaurantsFailure :: Error -> {Action}
const loadRestaurantsFailure = (error) => ({
  type: RESTAURANTS_LOADING_FAILURE,
  error,
});

// parseCategories :: [JSON] -> [String]
const parseCategories = (restaurants) =>
  restaurants.map(i => i.type.name).filter((i, e) => restaurants.indexOf(i) == e);

// loadRestaurants :: None -> Dispatch Func -> Action Data : Error
export const loadRestaurants = () =>
  (dispatch) => {
    dispatch(loadRestaurantsInitiation());
    fetch(restaurantUrl)
      .then(res => res.json())
      .then(data => {
        const {
          restaurants,
        } = data;
        const categories = parseCategories(restaurants);
        dispatch(
          loadRestaurantCategories(categories)
        );
        return restaurants;
      })
      .then(restaurants => {
        dispatch(
          loadRestaurantsSuccess(restaurants)
        );
      })
      .catch(error => {
        dispatch(
          loadRestaurantsFailure(error)
        );
      });
  };
