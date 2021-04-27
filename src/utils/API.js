import axios from "axios";

const getUsers = {
  getUsers: function () {
    return axios.get("https://randomuser.me/api/?results=40&nat=us");
  },
};

export default getUsers;