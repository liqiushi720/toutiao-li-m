// 读取数据
export const getItems = key => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 存储数据
export const setItems = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
