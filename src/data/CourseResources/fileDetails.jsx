// ? acceptable file types
// * icons: https://www.flaticon.com/packs/file-types
export const fileTypes = [
  {
    type: 'application/msword',
    extention: 'doc',
    icon: 'https://image.flaticon.com/icons/svg/136/136521.svg',
  },
  {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    extention: 'docx',
    icon: 'https://image.flaticon.com/icons/svg/136/136521.svg',
  },
  {
    type: 'application/pdf',
    extention: 'pdf',
    icon: 'https://image.flaticon.com/icons/svg/136/136522.svg',
  },
  {
    type: 'application/vnd.ms-powerpoint',
    extention: 'ppt',
    icon: 'https://image.flaticon.com/icons/svg/136/136543.svg',
  },
]

export const defaultFile = {
  name: 'Upload document',
  title: null,
  description: null,
  tags: [],
  type: null,
  extention: null,
  icon: 'https://image.flaticon.com/icons/svg/136/136549.svg',
  isValid: false,
  size: null,
  course: null,
}

const printSize = (_size) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  let i = 0
  let size = _size

  while (size > 900) {
    size /= 1024
    i += 1
  }

  return `${Math.round(size * 100) / 100} ${sizes[i]}`
}

const getTitle = (fileName) =>
  fileName
    .replace(/\.[^/.]+$/, '')
    .replace(/[\W_]+/g, ' ')
    .trim()

export const getFileDetails = (file, initialState = {}) => {
  if (!file) return defaultFile
  const { name, type } = file
  const fileType = fileTypes.find((item) => item.type === type)
  if (!fileType) return { ...defaultFile, name }

  return {
    ...defaultFile,
    ...initialState,
    name,
    title: getTitle(name),
    type,
    extention: name.split('.').pop().toLowerCase(),
    icon: fileType.icon,
    isValid: true,
    size: printSize(file.size),
  }
}
