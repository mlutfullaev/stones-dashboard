<<<<<<< HEAD
import axios from "axios";
import {siteUrl} from "../consts";

export const sending = (url, data) => {
  return axios.post(`${siteUrl}${url}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      "Content-type": "application/json",
    }
  })
}

export const patching = (url, data) => {
  return axios.patch(`${siteUrl}${url}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      "Content-type": "application/json",
    }
  })
}
export const sendingImg = (img) => {
  var bodyFormData = new FormData();
  bodyFormData.append("file", img);

  // отпраляю его на backend
  return axios
    .post(`${siteUrl}upload/`, bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
}

export const patchImg = (id, data) => {
  return axios.patch(`${siteUrl}upload/${id}`, data)
}
export const deleting = (url, id, setState) => {
  if (confirm("Вы точно хотите удалить")) {
    axios.delete(`${siteUrl}${url}${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-type": "application/json",
      }})
      .then(() => {
        setState((oldItems) => oldItems.filter(oldItem => id !== oldItem.id));
      })
  }
=======
import axios from "axios";
import {siteUrl} from "../consts";

export const sending = (url, data) => {
  return axios.post(`${siteUrl}${url}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      "Content-type": "application/json",
    }
  })
}

export const patching = (url, data) => {
  return axios.patch(`${siteUrl}${url}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      "Content-type": "application/json",
    }
  })
}
export const sendingImg = (img) => {
  var bodyFormData = new FormData();
  bodyFormData.append("file", img);

  // отпраляю его на backend
  return axios
    .post(`${siteUrl}upload/`, bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
}

export const patchImg = (id, data) => {
  return axios.patch(`${siteUrl}upload/${id}`, data)
}
export const deleting = (url, id, setState) => {
  if (confirm("Вы точно хотите удалить")) {
    axios.delete(`${siteUrl}${url}${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-type": "application/json",
      }})
      .then(() => {
        setState((oldItems) => oldItems.filter(oldItem => id !== oldItem.id));
      })
  }
>>>>>>> 2aebcbdf11a1c61d361f21e8a910adf582e25be4
}