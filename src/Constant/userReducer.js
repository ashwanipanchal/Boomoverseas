const userReducer = (state, action) => {
    switch(action.type){
        case "Name" :
            return {
                ...state, name : action.value
            }
        case "Email" :
            return {
                ...state, email : action.value
            }
        case "Phone" :
            return {
                ...state, phone : action.value
            }
        case "Password" :
            return {
                ...state, password : action.value
            }
        case "Age" :
            return {
                ...state, age : action.value
            }
        case "Toggle" :
            return {
                ...state, toggle : action.value
            }
    }
}
export default userReducer;