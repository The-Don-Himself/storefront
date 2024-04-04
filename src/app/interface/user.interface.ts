export interface UserLoginInterface {
    username: string,
    password: string,  
}

export interface UserInterface {
  id: number,
  email: string,
  username: string,
  password: string,
  name: {
      firstname: string,
      lastname: string,
  },
  address:{
      city: string,
      street: string,
      number: number,
      zipcode: string,
      geolocation: {
          lat: string,
          long: string
      }
  },
  phone: string,
}

export interface CreateUserInterface {
  email: string,
  username: string,
  password: string,
  name: {
      firstname: string,
      lastname: string,
  },
  address:{
      city: string,
      street: string,
      number: number,
      zipcode: string,
      geolocation: {
          lat: string,
          long: string
      }
  },
  phone: string,
}
