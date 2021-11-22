import axios from "axios";

const KEY = "AIzaSyDp5-nhlP6MAeUB_Fn1hlr0PMy5OA7i06U";

export default axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode/json",
  params: {
    language: "zh-HK",
    key: KEY
  }
});
