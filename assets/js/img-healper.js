// 压缩图片
export const compress = (img, ratio = 0.6) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const width = img.width
  const height = img.height
  canvas.width = width
  canvas.height = height
  // 铺底色
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, width, height)
  const ndata = canvas.toDataURL('image/jpeg', ratio)
  console.log('**压缩后的图片大小**', ndata.length / 1024)
  return ndata
}

// 检查 base64 大小
export const isNeedCompress = (base64, size = 50) => {
  const itemSize = base64.length / 1024
  const flag = itemSize > size
  if (flag) {
    console.log('**未压缩前的图片大小**', itemSize)
  } else {
    console.log(`**图片不大于 ${size}kb 无需压缩 **`)
  }
  return flag
}

// 创建图片
export const createImageBybase64 = (base64) => {
  const img = new Image()
  img.src = base64
  return new Promise((resolve) => {
    img.onload = function() {
      resolve(img)
    }
  })
}

export const blob2DataURI = (file) => {
  const reader = new FileReader()

  return new Promise((resolve) => {
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

// base64转二进制
export const dataURI2Blob = (dataURI) => {
  // base64 解码
  // const byteString = window.atob(dataURI.split(',')[1]);
  // const mimeString = dataURI
  //   .split(',')[0]
  //   .split(':')[1]
  //   .split(';')[0];
  // const ab = new ArrayBuffer(byteString.length);
  // const ia = new Uint8Array(ab);
  // for (let i = 0; i < byteString.length; i++) {
  //   ia[i] = byteString.charCodeAt(i);
  // }
  // return new Blob([ab], { type: mimeString });

  const arr = dataURI.split(',')
  const bstr = atob(arr[1])
  let n = bstr.length
  const mime = arr[0].match(/:(.*?);/)[1]
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// 压缩图片流程
export const handleCompress = async (file) => {
  let base64 = await blob2DataURI(file)
  if (isNeedCompress(base64, 50)) {
    const img = await createImageBybase64(base64)
    base64 = compress(img, 0.6)
  }
  return base64
}

export default {
  compress,
  isNeedCompress,
  createImageBybase64,
  blob2DataURI,
  dataURI2Blob,
  handleCompress
}
