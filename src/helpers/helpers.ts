export const createFiles = async (files, setItem) => {
  for (const file of files) {
    const response = await fetch(`http://1627061-ci09322.twc1.net:3001/upload/fayl/${file.id}`);
    const data = await response.blob();
    const metadata = {
      type: file.mimetype
    };
    const item = new File([data], file.originalname, metadata);
    setItem(oldItems => [...oldItems, {file: item, id: file.id, deleted: false}])
  }
}
export const createFile = async (file, setItem) => {
  const response = await fetch(`http://1627061-ci09322.twc1.net:3001/upload/fayl/${file.id}`);
  const data = await response.blob();
  const metadata = {
    type: file.mimetype
  };
  const item = new File([data], file.originalname, metadata);
  setItem(item)
}

export const checkFiles = async (file, secondFile) => {
  let result = false;
  const response = await fetch(`http://1627061-ci09322.twc1.net:3001/upload/fayl/${file.id}`);
  const data = await response.blob();
  const metadata = {
    type: file.mimetype
  };
  const firstFile = new File([data], file.originalname, metadata);
  // console.log(firstFile)
  // console.log(secondFile)
  if (URL.createObjectURL(firstFile) === URL.createObjectURL(secondFile)) {
    result = true;
  }
  return result;
}


export const updateArray = (setState, data) => {
  setState(array => {
    const newArray = [...array]
    const index = newArray.findIndex(item => item.id === data.id)
    newArray[index] = data
    return newArray
  })
}