import axios from "axios";

export const sending = (url, data) => {
  return axios.post(`http://1627061-ci09322.twc1.net:3001/${url}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      "Content-type": "application/json",
    }
  })
}

export const patching = (url, data) => {
  return axios.patch(`http://1627061-ci09322.twc1.net:3001/${url}`, data, {
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
    .post("http://1627061-ci09322.twc1.net:3001/upload/", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
}

export const patchImg = (id, data) => {
  return axios.patch(`http://1627061-ci09322.twc1.net:3001/upload/${id}`, data)
}
export const deleting = (url, id, setState) => {
  if (confirm("Вы точно хотите удалить")) {
    axios.delete(`http://1627061-ci09322.twc1.net:3001/${url}${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-type": "application/json",
      }})
      .then(() => {
        setState((oldItems) => oldItems.filter(oldItem => id !== oldItem.id));
      })
  }
}