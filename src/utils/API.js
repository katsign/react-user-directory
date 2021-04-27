import axios from "axios";

const getUsers = {
  getUsers: function () {
    return axios.get("https://randomuser.me/api/?results=80&nat=us");
  },
};

export default getUsers;