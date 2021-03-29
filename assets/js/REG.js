export default {
  must: /\S/,
  name: /^\S{2,32}$/,
  namereg: /^\S{2,32}$/,
  registername: /^\S{1,12}$/,
  cardnamereg: /^\S{2,12}$/,
  usernameReg: /^\S{6,12}$/,
  email: /^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  noonlynum: /[a-zA-Z]+/,
  min: /^[0-9A-Za-z]{6,}$/,
  maxsix: /^[0-9A-Za-z]{6,16}$/,
  post: /^[0-9]{7}$/,
  postPre: /^[0-9]{3}$/,
  postSuf: /^[0-9]{4}$/,
  sixpoint: /^.{6}$/

}
