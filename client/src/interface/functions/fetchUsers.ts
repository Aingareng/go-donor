export const userAdd = async (uri: string, firstName: string | undefined, lastName: string | undefined, age: any, email: string | undefined, password: string | undefined, phone: string | undefined, street: string | undefined, district: string | undefined, bloodType: string | undefined) => {
  try {
    const request = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
        phone: phone,
        address: {
          street: street,
          district: district
        },
        bloodType: bloodType
      })
    })
    return request
  } catch (error) {
    console.log(`Failed add user, message:${error}`)
  }
}

export const userLogin = async (uri: string, email: string | undefined, password: string | undefined) => {
  try {
    const request = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    return request
  } catch (error) {
    console.log(`Failed Login user, message:${error}`)
  }
}

export const userJoin = async (uri: string) => {
  try {
    const response = await fetch(uri, {
      method: "GET",
      headers: new Headers(),
      mode: "cors",
      cache: "default"
    })
    return response
  } catch (error) {
    console.log(`Failed count user join, message:${error}`)
  }
}

export const userList = async (uri: string, reqBloodType: string | undefined, token: string) => {
  try {
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ bloodType: reqBloodType })
    })
    return response
  } catch (error) {

  }
}